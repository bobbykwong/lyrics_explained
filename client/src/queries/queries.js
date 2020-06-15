import {gql} from 'apollo-boost';

const GET_SONG = gql`
    query Song($title: String!){
        song(title: $title) {
            title
            id
            verses{
                content
                position
                id
                interpretations{
                    content
                    likes
                    id
                }
            }
            artist{
                name
                artist_cover
            }
        }
    }
`;


const UPDATE_LIKES = gql`
    mutation($likes: Int! $id: Int!) {
        updateLikes(likes: $likes, id: $id){
            likes
            id
        }
    }
`;

export{
    GET_SONG,
    UPDATE_LIKES
}