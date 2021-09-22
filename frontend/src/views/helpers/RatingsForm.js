import { FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, Select } from "@material-ui/core";
import StarIcon from '../../resources/design-icons/StarIcon';
import StarRatings from 'react-star-ratings';


function RatingForm(props) {

    const {
        rating,
        setRating
    } = props.values

    const handleRatingChange = (newRating, name) => {
        setRating(newRating);
    };

    return (
        <div>
            {/* <FormControl
                variant="outlined"
                fullWidth
            >
                <InputLabel htmlFor="outlined-ratings-native-simple">
                    Rating
                </InputLabel>
                <Select
                    native
                    value={rating}
                    onChange={handleRatingChange}
                    label="Rating"
                    inputProps={{
                        name: "Rating",
                        id: "outlined-rating-native-simple",
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={1}><StarIcon /></option>
                    <option value={2}><StarIcon /><StarIcon /></option>
                    <option value={3}><StarIcon /><StarIcon /><StarIcon /></option>
                    <option value={4}><StarIcon /><StarIcon /><StarIcon /><StarIcon /></option>
                    <option value={5}><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></option>
                    <List>
                        <ListItem value={1}>
                            <ListItemIcon><StarIcon /></ListItemIcon>
                            <ListItemText primary=""/>
                        </ListItem>
                    </List>
                </Select>
            </FormControl> */}
            <StarRatings
                rating={rating}
                starRatedColor="blue"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name='rating'
            />
        </div>
    );
}

export default RatingForm;