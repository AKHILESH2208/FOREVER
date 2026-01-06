import React, { use, useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import axios from 'axios';
import { toast } from 'react-toastify';

const Product = () => {
  const {id}=useParams();
  const {products,currency,addToCart,token,backendUrl}=useContext(ShopContext);
  const [productData,setProductData]=useState(false);
  const [image,setImage]=useState('');
  const [size,setSize]=useState('');
  const [activeTab,setActiveTab]=useState('description');
  const [reviews,setReviews]=useState([]);
  const [averageRating,setAverageRating]=useState(0);
  const [totalReviews,setTotalReviews]=useState(0);
  const [showReviewForm,setShowReviewForm]=useState(false);
  const [rating,setRating]=useState(5);
  const [comment,setComment]=useState('');

  const fetchProductData=async()=>{
      products.map((item)=>{
        if(item._id===id){
          setProductData(item);
          setImage(item.image[0]);
          return null;
        }
      })
  }

  const fetchReviews = async () => {
    try {
      console.log('Fetching reviews for product:', id);
      const response = await axios.post(backendUrl + '/api/review/list', { productId: id });
      console.log('Reviews response:', response.data);
      if (response.data.success) {
        setReviews(response.data.reviews);
        setAverageRating(response.data.averageRating);
        setTotalReviews(response.data.totalReviews);
        console.log('Reviews set:', response.data.reviews.length, 'Average:', response.data.averageRating);
      }
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  }

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to submit a review');
      return;
    }
    console.log('Submitting review:', { productId: id, rating, comment });
    try {
      const response = await axios.post(backendUrl + '/api/review/add', 
        { productId: id, rating, comment },
        { headers: { token } }
      );
      console.log('Review response:', response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setShowReviewForm(false);
        setComment('');
        setRating(5);
        fetchReviews();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('Review submission error:', error);
      toast.error(error.message);
    }
  }

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.post(backendUrl + '/api/review/delete',
        { reviewId, productId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchReviews();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
      fetchProductData();
  },[id,products])

  return productData?(
    <div className='border-t-2 pt-10 transition-opacity ease-in'>
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <img 
                key={star}
                src={star <= Math.round(averageRating) ? assets.star_icon : assets.star_dull_icon} 
                alt="" 
                className="w-3.5" 
              />
            ))}
            <p className='pl-2'>({totalReviews})</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500':''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <button onClick={()=>setActiveTab('description')} className={`border px-5 py-3 text-sm ${activeTab === 'description' ? 'font-bold':''}`}>Description</button>
          <button onClick={()=>setActiveTab('reviews')} className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'font-bold':''}`}>Reviews ({totalReviews})</button>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          {activeTab === 'description' ? (
            <>
              <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
              <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Average Rating */}
              {totalReviews > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold">{averageRating}</div>
                    <div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <img 
                            key={star}
                            src={star <= Math.round(averageRating) ? assets.star_icon : assets.star_dull_icon} 
                            alt="" 
                            className="w-4" 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Review Button */}
              {token && !showReviewForm && (
                <button 
                  onClick={() => setShowReviewForm(true)}
                  className="bg-black text-white px-6 py-2 text-sm rounded w-fit mb-2"
                >
                  Write a Review
                </button>
              )}

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={submitReview} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-800 mb-3">Write Your Review</h3>
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <img
                          key={star}
                          src={star <= rating ? assets.star_icon : assets.star_dull_icon}
                          alt=""
                          className="w-6 cursor-pointer"
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-2">Comment</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      rows="4"
                      className="w-full border rounded px-3 py-2 text-gray-800"
                      placeholder="Share your experience with this product..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-black text-white px-6 py-2 text-sm rounded">
                      Submit Review
                    </button>
                    <button 
                      type="button"
                      onClick={() => {setShowReviewForm(false); setComment(''); setRating(5);}}
                      className="bg-gray-300 text-gray-800 px-6 py-2 text-sm rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
                </div>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <img 
                                key={star}
                                src={star <= review.rating ? assets.star_icon : assets.star_dull_icon} 
                                alt="" 
                                className="w-4" 
                              />
                            ))}
                          </div>
                          <p className="font-medium text-gray-800">{review.userName}</p>
                        </div>
                        <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                      {token && review.userId === localStorage.getItem('userId') && (
                        <button 
                          onClick={() => deleteReview(review._id)}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="my-24">
        <div className="text-center text-3xl py-2">
          <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {products.filter(item => item.category === productData.category && item._id !== productData._id).slice(0,5).map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  ): <div className="opacity-0"></div>

}

export default Product