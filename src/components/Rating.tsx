import { FC } from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface RatingProps {
    rating: number; 
}

const Rating: FC<RatingProps> = ({rating}) => {
    const renderStars = () => {
        const stars = []; 
        for(let i = 1; i <= 5; i++){
            if(rating >= i) 
                stars.push(<FaStar key={i} color="gold" />); 
            else if(rating >= i - 0.5) 
                stars.push(<FaStarHalfAlt key={i} color="gold" />);
            else stars.push(<FaRegStar key={i} color="gold" />); 
        }
        return stars; 
    }
  return (renderStars()); 
}

export default Rating