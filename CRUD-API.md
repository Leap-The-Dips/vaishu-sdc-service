
###Create images: 

####POST Request:
  `http://localhost:3003/images?id={product_id}`
#####Body:
  ```json
  {
    "images": [
        {
            "img_small": "https://images.s3.us-east-2.amazonaws.com/s-l64+(21).jpg",
            "img_large": "https://images.s3.us-east-2.amazonaws.com/s-l500+(21).jpg",
            "img_zoom": "https://images.s3.us-east-2.amazonaws.com/s-l1600+(21).jpg"
        },
        {
            "img_small": "https://images.s3.us-east-2.amazonaws.com/s-l64+(1).jpg",
            "img_large": "https://images.s3.us-east-2.amazonaws.com/s-l500+(1).jpg",
            "img_zoom": "https://images.s3.us-east-2.amazonaws.com/s-l1600+(1).jpg"
        }
    ]
}```
#####Response: [{image_id}]


###Read images: 

####GET Request:
  `http://localhost:3003/images?id={product_id}`

#####GET Response example:
  ```json
  {
    "name": "Centralized Sao Tome and Principe copying",
    "images": [
        {
            "small": "https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64.jpg",
            "large": "https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500.jpg",
            "zoom": "https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600.jpg"
        },
        {
            "small": "https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(1).jpg",
            "large": "https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(1).jpg",
            "zoom": "https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(1).jpg"
        }
    ]
}```

###Update image:
 
####PUT Request:
  `http://localhost:3003/images?id={image_id}`
#####Body:
  ```json
  {
    "image": {
        "img_small": "https://images.s3.us-east-2-image_small.jpg,
        "img_large": "https://images.s3.us-east-2-image-large.jpg",
        "img_zoom": "https://images.s3.us-east-2-image-zoom.jpg",
        "prodId": 11
    }
}
```
#####Response example: OK(HTTP status code 200)

###Delete images:

####DELETE Request:
  `http://localhost:3003/images?id={product_id}`

#####Response: OK(HTTP status code 200)
