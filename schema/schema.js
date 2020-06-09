const graphql = require('graphql')
const _ = require('lodash')
const joinMonster = require('join-monster')
const db = require('../db')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLInteger
} = graphql;

var users = [
  { 'user': 'barney',  'age': 36, 'active': true, id: 1 },
  { 'user': 'fred',    'age': 40, 'active': false, id: 2 },
  { 'user': 'pebbles', 'age': 1,  'active': true, id: 3 }
];

console.log(_.find(users, {id: 1}))


const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        artist: {
            type: ArtistType,
            sqlJoin: (songTable, artistTable) => `${songTable}.artist_id = ${artistTable}.id`
        }
    })
});

SongType._typeConfig = {
    sqlTable: 'song',
    uniqueKey: 'id'
}

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        artist_cover: {type: GraphQLString},
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args){
                // return _.filter(songs, {artist_id: parent.id});
            }
        }
    })
});

ArtistType._typeConfig = {
    sqlTable: 'artist',
    uniqueKey: 'id'
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        song: {
            type: SongType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args, context, resolveInfo){
                console.log(typeof args.id)
                return db.pool.query(`SELECT * FROM song where id=${args.id}`)
                    .then(results => {
                        return results.rows[0]
                    })
            }
        },
        artist: {
            type: ArtistType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db
                // return _.find(artists, {id: args.id});
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args){
                return db.pool.query('SELECT * FROM song');
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve(parent, args){
                // return artists
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})