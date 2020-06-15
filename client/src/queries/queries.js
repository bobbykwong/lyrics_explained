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

const GET_ARTIST = gql`
    {
        artist{
            name
            songs{
                title
            }
        }
    }
`;

const ADD_INTERPRETATION = gql`
    mutation($content: String!, $likes: Int! $verse_id: Int!) {
        addInterpretation(content: $content, likes: $likes, verse_id: $verse_id){
            content
            likes
            id
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
    GET_ARTIST,
    ADD_INTERPRETATION,
    UPDATE_LIKES
}