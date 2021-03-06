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
    GraphQLInt,
    GraphQLNonNull
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
        },
        verses: {
            type: new GraphQLList(VerseType),
            sqlJoin: (songTable, verseTable) => `${songTable}.id = ${verseTable}.song_id`
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
            sqlJoin: (artistTable, songTable) => `${artistTable}.id = ${songTable}.artist_id`
        }
    })
});


const VerseType = new GraphQLObjectType({
    name: 'Verse',
    sqlTable: 'verse',
    uniqueKey: 'id',
    fields: () => ({
        id: {type: GraphQLInt},
        content: {type: GraphQLString},
        position: {type: GraphQLInt},
        song: {
            type: new GraphQLList(SongType),
            sqlJoin: (songTable, verseTable) => `${songTable}.id = ${verseTable}.song_id`
        },
        interpretations: {
            type: new GraphQLList(InterpretationType),
            sqlJoin: (verseTable, interpretationTable) => `${verseTable}.id = ${interpretationTable}.verse_id `
        }
    })
});


const InterpretationType = new GraphQLObjectType({
    name: 'Interpretation',
    sqlTable: 'interpretation',
    uniqueKey: 'id',
    fields: () => ({
        id: {type: GraphQLInt},
        content: {type: GraphQLString},
        likes: {type: GraphQLInt},
        verse: {
            type: new GraphQLList(VerseType),
            sqlJoin: (verseTable, interpretationTable) => `${verseTable}.id = ${interpretationTable}.verse_id`
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        song: {
            type: SongType,
            args: {
                title: {type: GraphQLString},
                id: {type: GraphQLInt}
            },
            where: (songTable, args, context) => {
                const whereClause = [];
                if (args.id) {
                    return `${songTable}.id = ${args.id}`;
                }
                else if (args.title) {
                    return `${songTable}.title = '${args.title}'`
                }
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    return db.knex.raw(sql)
                })
            }
        },
        artist: {
            type: ArtistType,
            args: {
                name: {type: GraphQLString}
            },
            where: (artistTable, args, context) => {
                return `${artistTable}.name = '${args.name}'`
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    return db.knex.raw(sql)
                })
            }
        },
        verse: {
            type: VerseType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    console.log(args)
                    return db.knex.raw(sql)
                })
            }
        },
        interpretation: {
            type: InterpretationType,
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
        },
        verses: {
            type: new GraphQLList(VerseType),
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    return db.knex.raw(sql)
                })
            }
        },
        interpretations: {
            type: new GraphQLList(InterpretationType),
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, sql => {
                    return db.knex.raw(sql)
                })
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addArtist: {
            type: ArtistType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                artist_cover: {type: GraphQLString}
            },
            resolve(parent, args){
                const query = `INSERT INTO artist(name, artist_cover) VALUES ($1, $2) RETURNING *`;

                const values = [args.name, args.artist_cover];

                return db.pool.query(query, values)
                    .then(results => {
                        return results.rows[0]
                    })
            }
        },
        addSong: {
            type: SongType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                artist_id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                const query = `INSERT INTO song(title, artist_id) VALUES ($1, $2) RETURNING *`;

                const values = [args.title, args.artist_id];

                return db.pool.query(query, values)
                    .then(results => {
                        return results.rows[0]
                    })
            }
        },
        addVerse: {
            type: VerseType,
            args: {
                content: {type: new GraphQLNonNull(GraphQLString)},
                position: {type: new GraphQLNonNull(GraphQLInt)},
                song_id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                const query = `INSERT INTO verse(content, position, song_id) VALUES ($1, $2, $3) RETURNING *`;

                const values = [args.content, args.position, args.song_id];

                return db.pool.query(query, values)
                    .then(results => {
                        return results.rows[0]
                    })
            }
        },
        addInterpretation: {
            type: InterpretationType,
            args: {
                content: {type: new GraphQLNonNull(GraphQLString)},
                likes: {type: new GraphQLNonNull(GraphQLInt)},
                verse_id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                const query = `INSERT INTO interpretation(content, likes, verse_id) VALUES ($1, $2, $3) RETURNING *`;

                const values = [args.content, args.likes, args.verse_id];

                return db.pool.query(query, values)
                    .then(results => {
                        return results.rows[0]
                    })
            }
        },
        updateLikes: {
            type: InterpretationType,
            args: {
                likes: {type: new GraphQLNonNull(GraphQLInt)},
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                const query = `UPDATE interpretation SET likes=${args.likes} WHERE id=${args.id}`;

                return db.pool.query(query)
                    .then(results => {
                        return results.rows[0]
                    })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})