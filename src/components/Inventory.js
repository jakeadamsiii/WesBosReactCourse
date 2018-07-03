import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import Login from './Login';
import firebase from 'firebase';
import base, {firebaseApp} from '../base';

class Inventory extends React.Component{

    static propTypes ={
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth() .onAuthStateChanged(user =>{
            if(user){
                this.authHandler({user});
            }
        })
    }

    authHandler = async authData =>{
        //1. look up current store in firebase database
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store);
        //2. claim it if no owner 
        if (!store.owner){
            //save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        //3. set the state of inventory to reflect current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
        console.log(authData);
    }

    authenticate = provider =>{
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider)
                    .then(this.authHandler);
    }

    logout = async () =>{
        console.log('logging out!');
        await firebase.auth().signOut();
        this.setState({uid: null});
    }

    render(){
        const logOut = <button onClick={this.logout}>Log Out!</button>
        //1.check if logedin 
        if(!this.state.uid){
            return <Login authenticate={this.authenticate}/>;
        }
        //2. check if they are owner of the store
        if(this.state.uid !== this.state.owner){
            return <div><p>Sorry you are not the owner</p>{logOut}</div>
        }
        //3. must be owner render inventory
        return (
            <div className='inventory'>
                <h2>inventory</h2>
                {logOut}
                {Object.keys(this.props.fishes).map(key => 
                <EditFishForm 
                fish={this.props.fishes[key]} 
                updateFish={this.props.updateFish} 
                deleteFish={this.props.deleteFish} 
                key={key}
                index={key}
                />)}
                <AddFishForm addFish = {this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes
                </button>
            </div>
        )
    }
}

export default Inventory;