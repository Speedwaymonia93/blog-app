import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import moment from 'moment'
import {
  getRecentPosts, getSimilarPosts
} from '../services'

const PostWidget = ({categories, url}) => {
  const [ relatedPosts, setRelatedPosts ] = useState([])
  useEffect(() => {
    if (url) {
      getSimilarPosts(categories, url)
      .then((result)=>setRelatedPosts(result))
    } else {
      getRecentPosts()
      .then((result)=>setRelatedPosts(result))
}
  }, [ url ])
  
 
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>{ url ? 'Related posts' : 'Recent posts' }</h3>
      {
        relatedPosts.map((post) => {
          return (
            <div key={ post.title } className='flex items-centerw-full mb-4'>
              <div className='w-16 flex-none'>
                <img alt={ post.title } src={ post.featuredImage.url} height='60px' width='60px' className='align-middle rounded-full' />
              </div>
              <div className='flex-grow ml-4'>
                <p className='font-xs text-gray-500'>{ moment(post.createdAt).format('MMM DD, YYYY') }</p>
                <Link href={ `/post/${ post.url }` } className='text-md'>
                  {post.title}
                </Link>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PostWidget