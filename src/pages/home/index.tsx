import React from 'react'
import { PostMain } from '../../components'
import FollowingUser from '../../components/sidebar/followingItem/followingItem'
export const HomePage = () => {
  return (
    <>
      <div className='w-[calc(100%-90px)] max-w-[690px] ml-auto '  >
        <PostMain
          videoId='12312'
          caption='Những con cá lớn '
          videoURL='../../utils/beach.mp4'
          likes ={12}
          comments={12}
          shares={12}
          profile={
            {
              
              avatar:'https://placehold.co/35',
              displayedName:'TRIeu Dep trai',
              userName:'trieu3706'
            }
          }
        />
          <PostMain
          videoId='12312'
          caption='Những con cá lớn '
          videoURL='../../utils/beach.mp4'
          likes ={12}
          comments={12}
          shares={12}
          profile={
            {
              
              avatar:'https://placehold.co/35',
              displayedName:'TRIeu Dep trai',
              userName:'trieu3706'
            }
          }
        />
          <PostMain
          videoId='12312'
          caption='Những con cá lớn '
          videoURL='../../utils/beach.mp4'
          likes ={12}
          comments={12}
          shares={12}
          profile={
            {
              
              avatar:'https://placehold.co/35',
              displayedName:'TRIeu Dep trai',
              userName:'trieu3706'
            }
          }
        />
      </div>
    </>
  )
}

export default HomePage