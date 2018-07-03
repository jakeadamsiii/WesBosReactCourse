import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component{

    static propTypes = {addFish: PropTypes.func}


    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();
    

    createFish = (event) =>{
        event.preventDefault();
        const fish  = {
            name: this.nameRef.value.value,
            price: parseFloat(this.priceRef.value.value), 
            status: this.statusRef.value.value, 
            desc: this.descRef.value.value, 
            image: this.imageRef.value.value 
        }
        this.props.addFish(fish);
        //refresh this form
        event.currentTarget.reset();
        
    }
    render(){
        return (
            <form className='fish-edit' onSubmit={this.createFish}>
                <input name="name" type="text" placeholder='Name' ref={this.nameRef}/>
                <input name="price" type="text" placeholder='Price' ref={this.priceRef}/>
                <select name="status" ref={this.statusRef}>
                    <option value='avaliable'>Fresh!</option>
                    <option value='unavaliable'>Sold Out!</option>
                </select>
                <textarea name="desc" placeholder='Desc' ref={this.descRef}/>
                <input name="image" type="text" placeholder='Image' ref={this.imageRef}/>
                <button type='submit'>Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;