import React, {Component} from 'react';
import Modal from 'react-modal';
import ReCAPTCHA from "react-google-recaptcha";


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
      minWidth              : '360px'
    },
    h3 : {
          fontSize              : '1em !important',
    }
  };

  const buttStyle = {
    content : {
      backgroundColor:'red',
    },
    h3 : {
          fontSize              : '1em !important',
    }
  };
   
   


export class NewBid extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false,
        }
        this.bid = this.props.currBid;
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
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
        if (props.CurrBid !== this.bid) {
          this.bid = props.CurrBid;
        }
    }
    

    render(){
        return(
            <div>
            <a  onClick={this.openModal}>Bid Now</a>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="New Exercise"
                >
                    <h3 ref={subtitle => this.subtitle = subtitle}>New Entry</h3>
                        
                </Modal>
            </div>
        )
    }


}
export default NewBid;