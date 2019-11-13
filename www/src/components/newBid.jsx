import React, {Component} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      fontSize              : '1.2em',
      borderRadius          : '10px',
      width                 : '50%',
      maxWidth              : '700px',
      minWidth              : '360px',
      justifyContent:         'center',
      alignItems: 'center'
    },
    h3 : {
          fontSize              : '1em !important',
    }
  };
   
  const BidWrap = styled.a`
  width: 245px;
  height: 44px;
  margin-bottom: 28px;
  background: #473fdf;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0px 2px 12px -6px #473fdf;
  &:hover {
    cursor: pointer;
  }
`;
const YourLabel = styled.p`
font-size: 18px;
padding:20px 0 0 0;
margin:0;
font-weight: 600;
color: #1f2430;
font-family: 'Raleway', sans-serif;
`;
const CurrLabel = styled.p`
font-size: 15px;
padding:5px 0 15px 0;
margin:0;
font-weight: 500;
color: #1f2430;
font-family: 'Raleway', sans-serif;
`;
const Labelwrap = styled.div`
width: 100%;
justify-content: center;
padding:0;
margin:0;
align-items: center;
display: flex;
`;

const CloseButton = styled.button`
width: 30px;
height:30px;
position:absolute;
top:0;
right:0;
margin-top:5px;
margin-right:5px;
background: #473fdf;
color: #ffffff;
justify-content: center;
align-items: center;
border-radius: 8px;
font-size: 15px;
font-weight: 500;
box-shadow: 0px 2px 12px -6px #473fdf;
&:hover {
  cursor: pointer;
}
`;

const SubButton = styled.button`
width: 60px;
height:30px;
margin-top:5px;
margin-right:5px;
background: #473fdf;
color: #ffffff;
justify-content: center;
align-items: center;
border-radius: 8px;
font-size: 15px;
font-weight: 500;
box-shadow: 0px 2px 12px -6px #473fdf;
&:hover {
  cursor: pointer;
}
`;

const Paywrap = styled.div`
width: 100%;
padding-top: 15px;
justify-content: center;
align-items: center;
display: flex;
`;

Modal.setAppElement(document.getElementById('root'));


export class NewBid extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false,
            catch :false,
        }
        this.projData = this.props.projData;
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    openModal() {
      console.log(this.projData);
      this.setState({modalIsOpen: true});
    }

    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        let currentComponent = this;
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    componentWillReceiveProps(props) {
        if (props.projData !== this.projData) {
          this.projData = props.projData;
        }

    }
    onChange(value) {
      this.setState({catch: true});
    }
    handleSubmit(event) {    
      axios({
        method: 'post',
        url:"http://localhost:3800/job/bid/",
        withCredentials: true,
        data: {
          "session_token": localStorage.getItem('session'),
          "bid_value": this.projData.business_id,
          "current_bid": event.target.newBid.value,
          "job_id": this.projData.id
        },
        config:{
          headers:{'Content-Type':'application/json'}
        }
      })
      .then(function(response){
        this.closeModal();
      })
    }
    render(){
      const client = {
        sandbox:    'YOUR-SANDBOX-APP-ID',
        production: 'YOUR-PRODUCTION-APP-ID',
    }

        return(

            <div>
            <BidWrap onClick={this.openModal}>Bid Now</BidWrap>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="New Exercise"
                >
                <form onSubmit={this.handleSubmit}>
                <Labelwrap><YourLabel>Your Bid:</YourLabel></Labelwrap>
                    <Labelwrap><input type="float" name="newBid" required={true} style={{width:'90px', margin:'5px 0'}} /></Labelwrap>
                    <Labelwrap><CurrLabel>(Current bid: ${this.projData.current_bid})</CurrLabel></Labelwrap>
                    <Paywrap><ReCAPTCHA
                      sitekey="6Ld3C8IUAAAAANIMPOIYgQtScwpb7czcdD7VDb7t"
                      onChange={this.onChange}
                      style={{display: "flex"}}
                    /></Paywrap>
                    <Paywrap><PaypalExpressBtn client={client} currency={'USD'} total={1.00} /></Paywrap>
                    <Paywrap><SubButton type="submit" name="submit" >Submit</SubButton></Paywrap>
                    <CloseButton onClick={this.closeModal}>x</CloseButton>
                  </form>
                </Modal>
            </div>
        )
    }


}
export default NewBid;