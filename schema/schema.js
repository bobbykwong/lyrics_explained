const graphql = require('graphql')
const _ = require('lodash')
const joinMonster = require('join-monster').default;
const db = require('../db')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLInteger
} = graphql;


const SongType = new GraphQLObjectType({
    name: 'Song',
    sqlTable: 'song',
    uniqueKey: 'id',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        artist: {
            type: new GraphQLList(ArtistType),
            sqlJoin: (songTable, artistTable) => `${songTable}.artist_id = ${artistTable}.id`
        }
    })
});


const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    sqlTable: 'artist',
    uniqueKey: 'id',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        artist_cover: {type: GraphQLString},
        songs: {
            type: new GraphQLList(SongType),
            sqlJoin: (artistTable, songTable) => `${songTable}.artist_id = ${artistTable}.id`
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        song: {
            type: SongType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    return db.knex.raw(sql)
                })
            }
        },
        artist: {
            type: ArtistType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    return db.knex.raw(sql)
                })
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    return db.knex.raw(sql)
                })
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    return db.knex.raw(sql)
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})