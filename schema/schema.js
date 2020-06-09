const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString} = graphql;

const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        album_cover_url: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        song: {
            type: SongType,
            args: {id: {type: GraphQLString}}
        }
    }
})