"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const treeify = require("treeify");
const fs = require("fs");
const SwaggerParser = require("swagger-parser");

const buildSwaggerResponse = endPointData =>{
    let tempResponse;
    if(endPointData.type === 'object') {
      tempResponse = {};
      const entities = Object.entries(endPointData.properties);
      for(let entityIndex = 0; entityIndex < entities.length; entityIndex++) {
        tempResponse[entities[entityIndex][0]] = buildSwaggerResponse(entities[entityIndex][1]);
      }
    } else if(endPointData.type === 'string') {
      return (endPointData.example ? endPointData.example : 'string');
    } else if(endPointData.type === 'int' || endPointData.type === 'int64' || endPointData.type === 'integer') {
      return (endPointData.example ? endPointData.example : 0);
    } else if(endPointData.type === 'boolean') {
      return (endPointData.example ? endPointData.example : true);
    } else if(endPointData.type === 'array') {
      tempResponse = [buildSwaggerResponse(endPointData.items)]; // need to fix
    }

    return tempResponse;
}

class Mocker {
  constructor() {
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.addURL = this.addURL.bind(this);
    this.value = this.value.bind(this);
    this.init = this.init.bind(this);
    this.fromSwagger = this.fromSwagger.bind(this);
    this.configServer = this.configServer.bind(this);

    this.error = {
      error: "An issue occured"
    };

    this.init();
  }

  init(port = 4000, dataSet = {}) {
    this.port = port;
    this.data = dataSet;
    this.configServer();
  }

  async fromSwagger(apiFile) {
    console.log(`\nBuilding Mocker from Swagger File\n`);
    this.configServer();
    
    try {
      const api = await SwaggerParser.validate(apiFile);
      console.log("API name: %s, Version: %s".magenta, api.info.title, api.info.version);

      const apiEntries = Object.entries(api.paths);
      for(let objectsIndex = 0; objectsIndex < apiEntries.length; objectsIndex++) {
        const endPoint = apiEntries[objectsIndex][0];
        const locationData = apiEntries[objectsIndex][1];
        
        if(locationData.get !== undefined) {
          if(locationData.get.responses['200'] !== undefined) {
            const swaggerResponse =  buildSwaggerResponse(locationData.get.responses['200'].schema);
            this.get(endPoint, () => {return swaggerResponse;})
          }
        } else if(locationData.post !== undefined) {
          if(locationData.post.responses['200'] !== undefined) {
            const swaggerResponse =  buildSwaggerResponse(locationData.post.responses['200'].schema);
            this.post(endPoint, () => {return swaggerResponse;})
          }
        }
      }
    }
    catch(err) {
      console.error(err);
    }
  }

  configServer() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.urlEndPoints = {};
  }

  get(endPoint, callBack, error = false) {
    this.addURL(endPoint);
    this.app.get(endPoint, (res, req) => {
      try {
        req.json(callBack(res.body, res));
      } catch (e) {
        console.log(e);
        req.status(500).json(error ? error : this.error);
      }
    });
  }

  post(endPoint, callBack, error = false) {
    this.addURL(endPoint);
    this.app.post(endPoint, (res, req) => {
      try {
        req.json(callBack(res.body, res));
      } catch (e) {
        console.log(e);
        req.status(500).json(error ? error : this.error);
      }
    });
  }

  addURL(endPoint) {
    const segments = endPoint.split("/");
    let objPos = this.urlEndPoints;
    for (let i = 1; i < segments.length; i++) {
      if (objPos[segments[i]] == undefined) {
        objPos[segments[i]] = {};
      }
      objPos = objPos[segments[i]];
    }
    objPos = null;
  }

  value(str, index) {
    let obj = this.data;
    let a = str
      .replace(/\[(\w+)\]/g, ".$1")
      .replace(/^\./, "")
      .split(".");
    for (let i = 0, n = a.length; i < n; ++i) {
      let k = a[i];
      if (k in obj) obj = obj[k];
      else return;
    }
    return obj[index];
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`\n\nMocker running\n${`http://localhost:${this.port}/`.green}\n`);
      console.log(`End Points:\n${treeify.asTree(this.urlEndPoints).green}`);
    });
  }
}

module.exports = Mocker;
