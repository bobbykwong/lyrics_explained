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

const GET_ARTIST_SINGLE = gql`
    query Artist($name: String!){
        artist(name: $name){
            name
            artist_cover
            id
            songs{
                title
            }
        }
    }
`;

const GET_SONGS = gql`
    {
        songs {
            title
            artist{
                name
                artist_cover
            }
        }
    }
`;


const ADD_ARTIST = gql`
    mutation($name: String!, $artist_cover: String!) {
        addArtist(name: $name, artist_cover: $artist_cover){
            name
            id
            artist_cover
        }
    }
`;

const ADD_SONG = gql`
    mutation($title: String!, $artist_id: Int!) {
        addSong(title: $title, artist_id: $artist_id){
            title
            id
        }
    }
`;

const ADD_VERSE = gql`
    mutation($content: String!, $position: Int!, $song_id: Int!) {
        addVerse(content: $content, position: $position, song_id: $song_id){
            content
            position
            id
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
    GET_ARTIST_SINGLE,
    GET_SONGS,
    ADD_ARTIST,
    ADD_SONG,
    ADD_VERSE,
    ADD_INTERPRETATION,
    UPDATE_LIKES
}