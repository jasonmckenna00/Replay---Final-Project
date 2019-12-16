import React from 'react';
import NavbarContainer from '../navbar/navbar_container';
import VideoIndexItem from './video_index_item'
import LoadingScreen from '../loading_screen';
import SideBarContainer from '../sidebar/side_bar_container'

class VideoIndex extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        Promise.all([this.props.fetchAllUsers(), this.props.fetchAllVideos()])
        // this.props.fetchAllVideos().then(()=> this.props.fetchAllUsers())
    }


    render(){

        // debugger
        if (this.props.loading.videoLoading || this.props.loading.userLoading) return <LoadingScreen />
        // debugger
        const { videos, users, fetchUser, loading } = this.props
        const videosLis = videos.map( video => <VideoIndexItem 
                                                key={video.id} 
                                                video={video} 
                                                user={users[video.user_id]} 
                                                fetchUser={fetchUser}
                                                loading={loading}/>)    
        return <>
            <div className='splashpage'>
                <SideBarContainer />
                <div>
                    <h2 className='video-index-header'> Recommended</h2>
                    <ul className='videos-container'> {videosLis} </ul>
                </div>
            </div>
        </>
    }
}

export default VideoIndex