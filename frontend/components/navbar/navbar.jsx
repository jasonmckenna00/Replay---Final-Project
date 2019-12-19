import React from 'react';
import LoginContainer from '../session/login_container'
import { withRouter, Route, Link } from 'react-router-dom';
import SignupContainer from '../session/signup_container'
import NavbarDropdown from './navbar_dropdown';




class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.signIn = this.signIn.bind(this)
        this.changeSideBar = this.changeSideBar.bind(this)
        this.state = {
            dropdown: false,
            // loggedin: !!this.props.currUser
        }
        this.dropRef = React.createRef()
        this.handleDropDownBlurr = this.handleDropDownBlurr.bind(this)

    }

    // componentDidUpdate(prev){
    //     // debugger
    //     if ((prev.location.pathname !== this.props.history.location.pathname) && (this.state.dropdown )){
    //         this.setState({dropdown: false})
    //     }
    // }

    dropDownMenu(){
        // debugger
        const currUser = Object.values(this.props.currUser)[0]
       
        return (
         
                <div className='dom'>
                    <div className='dropdown-container'>
                        <div className='dropdown-header'>
                            <i className="fas fa-user dropdown-user-icon"></i>
                            <div className='dropdown-header-userinfo'>
                                <h2 className='dropdown-username'>{currUser.firstName}</h2>
                                <h3 className='dropdown-email'>{currUser.email}</h3>
                            </div>
                        </div> 
                        <div className='dropdown-body'>
                            <div className='create-a-channel'>
                                <i className="fas fa-portrait"></i>
                                <h2 >Create a channel</h2>
                            </div>
                            <div className='sign-out' onClick={ () => this.props.logout()}>
                                <i className="fas fa-sign-out-alt"></i>
                                <h2 >Sign out</h2>
                            </div>
                                
                            
                        </div>
                    </div>

                </div>
        )
    }




    signIn(){
        return this.props.history.push('/login')
    }

    loginStatus(){  
        if (this.props.currUser) return this.isLoggedIn()
          else return this.isLoggedOut()
    }


    isLoggedOut(){
        return (
            <div className='signin-button-container' onClick={()=> this.signIn()} >
                <i className="fas fa-user-circle"></i>
                <h2 className='signin-button-link'>SIGN IN</h2>
            </div>
        )
    }

    isLoggedIn(){
        return (
            <div className='logged-in'  onClick={()=> this.changeDropDown()}  onBlur={this.handleDropDownBlurr(this.dropRef, () =>this.setState({dropdown: false}))} > 
                <i className="fas fa-play-circle"></i>
            </div>
    
        )
    }

    handleDropDownBlurr(ref, callback){
        // debugger
        return e => {
            if (!ref.current.contains(e.relatedTarget)) {
                callback()
            }
            
            // this.setState({dropdown: false})
        }
    }

    changeDropDown(){
            // debugger
            if (this.state.dropdown){
                this.setState({dropdown: false})
            } else {
                this.setState({dropdown: true})
            }
        }


    changeSideBar(){
        if (this.props.isOpen){
            this.props.closeSideBar()
        } else {
            this.props.openSideBar();
        }
    }

    render() {
        const  currPath  = this.props.history.location.pathname
        let tempClass = ((currPath === '/login') || (currPath === '/signup')) ? 'navbar-hidden' : '';
        // const dropdown = (this.state.dropdown && this.props.currUser) ? this.dropDownMenu() : null;
        const ddComponent = <NavbarDropdown 
                            logout={this.props.logout} 
                            currUser={this.props.currUser} 
                            displayed={this.state.dropdown} tabIndex='0' />

        const dropdown = this.props.currUser ? ddComponent : null;

        
    return(
        <>
            <Route path='/login' component={LoginContainer}/>
            <Route path='/signup' component={SignupContainer}/>


            <div className={`navbar-container ${tempClass}`} >
                <div className='navbar'>
                    <div className='side-bar-and-replay-logo'>

                        <div className='side-bar-button'>
                            <i className="fas fa-bars" onClick={()=> this.changeSideBar()}></i>
                        </div>
                        <div className='replay-logo'>
                            <img src={window.replay_logo} className='logo-signup' onClick={()=> this.props.history.push('/')}/> 
                        </div>
                    </div>
                    
                    <div className='search-bar-container'>
                        <div className='search-bar'>
                            <input type="text" className='search-bar-input' placeholder='Search'/>
                            <i className="fas fa-search"></i>
                        </div>
                    </div>

                    <div className='right-buttons' ref={this.dropRef}>
                        <div className='camera-icon'>
                            <i className="fas fa-video" onClick={()=> this.props.history.push('/uploadvideo')}></i>
                        </div>
                        <div className='apps-icon'>
                            <i className="fas fa-th"></i> 
                        </div>
                        <div className='settings-icon'>
                            
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                        {this.loginStatus()}
                    </div>
                </div>
            </div>
            {dropdown}

        </>

        
    )}
}
export default withRouter(Navbar)