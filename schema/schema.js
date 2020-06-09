const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

// Dummy data
const songs = [
    {title: 'wakada', album_cover_url: 'www.wakanda', id: '1', artist_id: '1'},
    {title: 'hello', album_cover_url: 'www.hello', id: '2', artist_id: '2'},
    {title: 'hold on', album_cover_url: 'www.holdon', id: '2', artist_id: '2'},
    {title: 'later', album_cover_url: 'www.later', id: '2', artist_id: '2'},
    {title: 'lol', album_cover_url: 'www.lollll', id: '3', artist_id: '3'},
    {title: 'zzzz', album_cover_url: 'www.zzzzz', id: '3', artist_id: '3'}
]

const artists = [
    {name: 'bobby', id: '1'},
    {name: 'sam', id: '2'},
    {name: 'paul', id: '3'}
]

const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        album_cover_url: {type: GraphQLString},
        artist: {
            type: ArtistType,
            resolve(parent, args){
                console.log(parent);
                return _.find(artists, {id: parent.artist_id});
            }
        }
    })
});

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args){
                return _.filter(songs, {artist_id: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        song: {
            type: SongType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db
                console.log(typeof(args.id))
                return _.find(songs, {id: args.id});
            }
        },
        artist: {
            type: ArtistType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db
                return _.find(artists, {id: args.id});
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args){
                return songs
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve(parent, args){
                return artists
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})