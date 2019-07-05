import React from "react";
import { MDBCardImage } from "mdbreact";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
    
    <MDBCardImage
              cascade
              src={`${API}/${url}/photo/${item._id}`}
              top
              alt={item.name}
              overlay="white-slight"
            />

);

export default ShowImage;
