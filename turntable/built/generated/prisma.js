'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const prisma_binding_1 = require('prisma-binding');
/**
 * Type Defs
 */
const typeDefs = `type AggregateMigration {
  count: Int!
}

type AggregatePlaylist {
  count: Int!
}

type AggregateRemoteControl {
  count: Int!
}

type AggregateTrack {
  count: Int!
}

type AggregateTrackInfo {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

enum ControlAction {
  PLAY
  PAUSE
  SET
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Migration implements Node {
  id: ID!
  index: Int
  name: String!
}

"""A connection to a list of items."""
type MigrationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [MigrationEdge]!
  aggregate: AggregateMigration!
}

input MigrationCreateInput {
  index: Int
  name: String!
}

"""An edge in a connection."""
type MigrationEdge {
  """The item at the end of the edge."""
  node: Migration!

  """A cursor for use in pagination."""
  cursor: String!
}

enum MigrationOrderByInput {
  id_ASC
  id_DESC
  index_ASC
  index_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type MigrationPreviousValues {
  id: ID!
  index: Int
  name: String!
}

type MigrationSubscriptionPayload {
  mutation: MutationType!
  node: Migration
  updatedFields: [String!]
  previousValues: MigrationPreviousValues
}

input MigrationSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [MigrationSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [MigrationSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MigrationSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: MigrationWhereInput
}

input MigrationUpdateInput {
  index: Int
  name: String
}

input MigrationWhereInput {
  """Logical AND on all given filters."""
  AND: [MigrationWhereInput!]

  """Logical OR on all given filters."""
  OR: [MigrationWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MigrationWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  index: Int

  """All values that are not equal to given value."""
  index_not: Int

  """All values that are contained in given list."""
  index_in: [Int!]

  """All values that are not contained in given list."""
  index_not_in: [Int!]

  """All values less than the given value."""
  index_lt: Int

  """All values less than or equal the given value."""
  index_lte: Int

  """All values greater than the given value."""
  index_gt: Int

  """All values greater than or equal the given value."""
  index_gte: Int
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
}

input MigrationWhereUniqueInput {
  id: ID
  index: Int
}

type Mutation {
  createTrack(data: TrackCreateInput!): Track!
  createPlaylist(data: PlaylistCreateInput!): Playlist!
  createRemoteControl(data: RemoteControlCreateInput!): RemoteControl!
  createMigration(data: MigrationCreateInput!): Migration!
  createTrackInfo(data: TrackInfoCreateInput!): TrackInfo!
  updateTrack(data: TrackUpdateInput!, where: TrackWhereUniqueInput!): Track
  updatePlaylist(data: PlaylistUpdateInput!, where: PlaylistWhereUniqueInput!): Playlist
  updateRemoteControl(data: RemoteControlUpdateInput!, where: RemoteControlWhereUniqueInput!): RemoteControl
  updateMigration(data: MigrationUpdateInput!, where: MigrationWhereUniqueInput!): Migration
  updateTrackInfo(data: TrackInfoUpdateInput!, where: TrackInfoWhereUniqueInput!): TrackInfo
  deleteTrack(where: TrackWhereUniqueInput!): Track
  deletePlaylist(where: PlaylistWhereUniqueInput!): Playlist
  deleteRemoteControl(where: RemoteControlWhereUniqueInput!): RemoteControl
  deleteMigration(where: MigrationWhereUniqueInput!): Migration
  deleteTrackInfo(where: TrackInfoWhereUniqueInput!): TrackInfo
  upsertTrack(where: TrackWhereUniqueInput!, create: TrackCreateInput!, update: TrackUpdateInput!): Track!
  upsertPlaylist(where: PlaylistWhereUniqueInput!, create: PlaylistCreateInput!, update: PlaylistUpdateInput!): Playlist!
  upsertRemoteControl(where: RemoteControlWhereUniqueInput!, create: RemoteControlCreateInput!, update: RemoteControlUpdateInput!): RemoteControl!
  upsertMigration(where: MigrationWhereUniqueInput!, create: MigrationCreateInput!, update: MigrationUpdateInput!): Migration!
  upsertTrackInfo(where: TrackInfoWhereUniqueInput!, create: TrackInfoCreateInput!, update: TrackInfoUpdateInput!): TrackInfo!
  updateManyTracks(data: TrackUpdateInput!, where: TrackWhereInput): BatchPayload!
  updateManyPlaylists(data: PlaylistUpdateInput!, where: PlaylistWhereInput): BatchPayload!
  updateManyRemoteControls(data: RemoteControlUpdateInput!, where: RemoteControlWhereInput): BatchPayload!
  updateManyMigrations(data: MigrationUpdateInput!, where: MigrationWhereInput): BatchPayload!
  updateManyTrackInfoes(data: TrackInfoUpdateInput!, where: TrackInfoWhereInput): BatchPayload!
  deleteManyTracks(where: TrackWhereInput): BatchPayload!
  deleteManyPlaylists(where: PlaylistWhereInput): BatchPayload!
  deleteManyRemoteControls(where: RemoteControlWhereInput): BatchPayload!
  deleteManyMigrations(where: MigrationWhereInput): BatchPayload!
  deleteManyTrackInfoes(where: TrackInfoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Playlist implements Node {
  id: ID!
  name: String!
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track!]
}

"""A connection to a list of items."""
type PlaylistConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PlaylistEdge]!
  aggregate: AggregatePlaylist!
}

input PlaylistCreateInput {
  name: String!
  tracks: TrackCreateManyWithoutPlaylistInput
}

input PlaylistCreateOneWithoutTracksInput {
  create: PlaylistCreateWithoutTracksInput
  connect: PlaylistWhereUniqueInput
}

input PlaylistCreateWithoutTracksInput {
  name: String!
}

"""An edge in a connection."""
type PlaylistEdge {
  """The item at the end of the edge."""
  node: Playlist!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PlaylistOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PlaylistPreviousValues {
  id: ID!
  name: String!
}

type PlaylistSubscriptionPayload {
  mutation: MutationType!
  node: Playlist
  updatedFields: [String!]
  previousValues: PlaylistPreviousValues
}

input PlaylistSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PlaylistSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PlaylistSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PlaylistSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PlaylistWhereInput
}

input PlaylistUpdateInput {
  name: String
  tracks: TrackUpdateManyWithoutPlaylistInput
}

input PlaylistUpdateOneWithoutTracksInput {
  create: PlaylistCreateWithoutTracksInput
  connect: PlaylistWhereUniqueInput
  delete: Boolean
  update: PlaylistUpdateWithoutTracksDataInput
  upsert: PlaylistUpsertWithoutTracksInput
}

input PlaylistUpdateWithoutTracksDataInput {
  name: String
}

input PlaylistUpsertWithoutTracksInput {
  update: PlaylistUpdateWithoutTracksDataInput!
  create: PlaylistCreateWithoutTracksInput!
}

input PlaylistWhereInput {
  """Logical AND on all given filters."""
  AND: [PlaylistWhereInput!]

  """Logical OR on all given filters."""
  OR: [PlaylistWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PlaylistWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  tracks_every: TrackWhereInput
  tracks_some: TrackWhereInput
  tracks_none: TrackWhereInput
}

input PlaylistWhereUniqueInput {
  id: ID
  name: String
}

type Query {
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track]!
  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist]!
  remoteControls(where: RemoteControlWhereInput, orderBy: RemoteControlOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RemoteControl]!
  migrations(where: MigrationWhereInput, orderBy: MigrationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Migration]!
  trackInfoes(where: TrackInfoWhereInput, orderBy: TrackInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TrackInfo]!
  track(where: TrackWhereUniqueInput!): Track
  playlist(where: PlaylistWhereUniqueInput!): Playlist
  remoteControl(where: RemoteControlWhereUniqueInput!): RemoteControl
  migration(where: MigrationWhereUniqueInput!): Migration
  trackInfo(where: TrackInfoWhereUniqueInput!): TrackInfo
  tracksConnection(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrackConnection!
  playlistsConnection(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaylistConnection!
  remoteControlsConnection(where: RemoteControlWhereInput, orderBy: RemoteControlOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RemoteControlConnection!
  migrationsConnection(where: MigrationWhereInput, orderBy: MigrationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MigrationConnection!
  trackInfoesConnection(where: TrackInfoWhereInput, orderBy: TrackInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrackInfoConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type RemoteControl implements Node {
  id: ID!
  song(where: TrackWhereInput): Track!
  action: ControlAction!
}

"""A connection to a list of items."""
type RemoteControlConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [RemoteControlEdge]!
  aggregate: AggregateRemoteControl!
}

input RemoteControlCreateInput {
  action: ControlAction!
  song: TrackCreateOneWithoutControlsInput!
}

input RemoteControlCreateManyWithoutSongInput {
  create: [RemoteControlCreateWithoutSongInput!]
  connect: [RemoteControlWhereUniqueInput!]
}

input RemoteControlCreateWithoutSongInput {
  action: ControlAction!
}

"""An edge in a connection."""
type RemoteControlEdge {
  """The item at the end of the edge."""
  node: RemoteControl!

  """A cursor for use in pagination."""
  cursor: String!
}

enum RemoteControlOrderByInput {
  id_ASC
  id_DESC
  action_ASC
  action_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type RemoteControlPreviousValues {
  id: ID!
  action: ControlAction!
}

type RemoteControlSubscriptionPayload {
  mutation: MutationType!
  node: RemoteControl
  updatedFields: [String!]
  previousValues: RemoteControlPreviousValues
}

input RemoteControlSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [RemoteControlSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [RemoteControlSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RemoteControlSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: RemoteControlWhereInput
}

input RemoteControlUpdateInput {
  action: ControlAction
  song: TrackUpdateOneWithoutControlsInput
}

input RemoteControlUpdateManyWithoutSongInput {
  create: [RemoteControlCreateWithoutSongInput!]
  connect: [RemoteControlWhereUniqueInput!]
  disconnect: [RemoteControlWhereUniqueInput!]
  delete: [RemoteControlWhereUniqueInput!]
  update: [RemoteControlUpdateWithWhereUniqueWithoutSongInput!]
  upsert: [RemoteControlUpsertWithWhereUniqueWithoutSongInput!]
}

input RemoteControlUpdateWithoutSongDataInput {
  action: ControlAction
}

input RemoteControlUpdateWithWhereUniqueWithoutSongInput {
  where: RemoteControlWhereUniqueInput!
  data: RemoteControlUpdateWithoutSongDataInput!
}

input RemoteControlUpsertWithWhereUniqueWithoutSongInput {
  where: RemoteControlWhereUniqueInput!
  update: RemoteControlUpdateWithoutSongDataInput!
  create: RemoteControlCreateWithoutSongInput!
}

input RemoteControlWhereInput {
  """Logical AND on all given filters."""
  AND: [RemoteControlWhereInput!]

  """Logical OR on all given filters."""
  OR: [RemoteControlWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RemoteControlWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  action: ControlAction

  """All values that are not equal to given value."""
  action_not: ControlAction

  """All values that are contained in given list."""
  action_in: [ControlAction!]

  """All values that are not contained in given list."""
  action_not_in: [ControlAction!]
  song: TrackWhereInput
}

input RemoteControlWhereUniqueInput {
  id: ID
}

type Subscription {
  track(where: TrackSubscriptionWhereInput): TrackSubscriptionPayload
  playlist(where: PlaylistSubscriptionWhereInput): PlaylistSubscriptionPayload
  remoteControl(where: RemoteControlSubscriptionWhereInput): RemoteControlSubscriptionPayload
  migration(where: MigrationSubscriptionWhereInput): MigrationSubscriptionPayload
  trackInfo(where: TrackInfoSubscriptionWhereInput): TrackInfoSubscriptionPayload
}

type Track implements Node {
  id: ID!
  info(where: TrackInfoWhereInput): TrackInfo!
  playlist(where: PlaylistWhereInput): Playlist!
  index: Int
  controls(where: RemoteControlWhereInput, orderBy: RemoteControlOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RemoteControl!]
}

"""A connection to a list of items."""
type TrackConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TrackEdge]!
  aggregate: AggregateTrack!
}

input TrackCreateInput {
  index: Int
  info: TrackInfoCreateOneInput!
  playlist: PlaylistCreateOneWithoutTracksInput!
  controls: RemoteControlCreateManyWithoutSongInput
}

input TrackCreateManyWithoutPlaylistInput {
  create: [TrackCreateWithoutPlaylistInput!]
  connect: [TrackWhereUniqueInput!]
}

input TrackCreateOneWithoutControlsInput {
  create: TrackCreateWithoutControlsInput
  connect: TrackWhereUniqueInput
}

input TrackCreateWithoutControlsInput {
  index: Int
  info: TrackInfoCreateOneInput!
  playlist: PlaylistCreateOneWithoutTracksInput!
}

input TrackCreateWithoutPlaylistInput {
  index: Int
  info: TrackInfoCreateOneInput!
  controls: RemoteControlCreateManyWithoutSongInput
}

"""An edge in a connection."""
type TrackEdge {
  """The item at the end of the edge."""
  node: Track!

  """A cursor for use in pagination."""
  cursor: String!
}

type TrackInfo implements Node {
  id: ID!
  thumbnail: String
  title: String!
  description: String
  url: String!
  source: TrackSource!
}

"""A connection to a list of items."""
type TrackInfoConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TrackInfoEdge]!
  aggregate: AggregateTrackInfo!
}

input TrackInfoCreateInput {
  thumbnail: String
  title: String!
  description: String
  url: String!
  source: TrackSource!
}

input TrackInfoCreateOneInput {
  create: TrackInfoCreateInput
  connect: TrackInfoWhereUniqueInput
}

"""An edge in a connection."""
type TrackInfoEdge {
  """The item at the end of the edge."""
  node: TrackInfo!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TrackInfoOrderByInput {
  id_ASC
  id_DESC
  thumbnail_ASC
  thumbnail_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  source_ASC
  source_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TrackInfoPreviousValues {
  id: ID!
  thumbnail: String
  title: String!
  description: String
  url: String!
  source: TrackSource!
}

type TrackInfoSubscriptionPayload {
  mutation: MutationType!
  node: TrackInfo
  updatedFields: [String!]
  previousValues: TrackInfoPreviousValues
}

input TrackInfoSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TrackInfoSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TrackInfoSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TrackInfoSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TrackInfoWhereInput
}

input TrackInfoUpdateDataInput {
  thumbnail: String
  title: String
  description: String
  url: String
  source: TrackSource
}

input TrackInfoUpdateInput {
  thumbnail: String
  title: String
  description: String
  url: String
  source: TrackSource
}

input TrackInfoUpdateOneInput {
  create: TrackInfoCreateInput
  connect: TrackInfoWhereUniqueInput
  delete: Boolean
  update: TrackInfoUpdateDataInput
  upsert: TrackInfoUpsertNestedInput
}

input TrackInfoUpsertNestedInput {
  update: TrackInfoUpdateDataInput!
  create: TrackInfoCreateInput!
}

input TrackInfoWhereInput {
  """Logical AND on all given filters."""
  AND: [TrackInfoWhereInput!]

  """Logical OR on all given filters."""
  OR: [TrackInfoWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TrackInfoWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  thumbnail: String

  """All values that are not equal to given value."""
  thumbnail_not: String

  """All values that are contained in given list."""
  thumbnail_in: [String!]

  """All values that are not contained in given list."""
  thumbnail_not_in: [String!]

  """All values less than the given value."""
  thumbnail_lt: String

  """All values less than or equal the given value."""
  thumbnail_lte: String

  """All values greater than the given value."""
  thumbnail_gt: String

  """All values greater than or equal the given value."""
  thumbnail_gte: String

  """All values containing the given string."""
  thumbnail_contains: String

  """All values not containing the given string."""
  thumbnail_not_contains: String

  """All values starting with the given string."""
  thumbnail_starts_with: String

  """All values not starting with the given string."""
  thumbnail_not_starts_with: String

  """All values ending with the given string."""
  thumbnail_ends_with: String

  """All values not ending with the given string."""
  thumbnail_not_ends_with: String
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  url: String

  """All values that are not equal to given value."""
  url_not: String

  """All values that are contained in given list."""
  url_in: [String!]

  """All values that are not contained in given list."""
  url_not_in: [String!]

  """All values less than the given value."""
  url_lt: String

  """All values less than or equal the given value."""
  url_lte: String

  """All values greater than the given value."""
  url_gt: String

  """All values greater than or equal the given value."""
  url_gte: String

  """All values containing the given string."""
  url_contains: String

  """All values not containing the given string."""
  url_not_contains: String

  """All values starting with the given string."""
  url_starts_with: String

  """All values not starting with the given string."""
  url_not_starts_with: String

  """All values ending with the given string."""
  url_ends_with: String

  """All values not ending with the given string."""
  url_not_ends_with: String
  source: TrackSource

  """All values that are not equal to given value."""
  source_not: TrackSource

  """All values that are contained in given list."""
  source_in: [TrackSource!]

  """All values that are not contained in given list."""
  source_not_in: [TrackSource!]
}

input TrackInfoWhereUniqueInput {
  id: ID
  url: String
}

enum TrackOrderByInput {
  id_ASC
  id_DESC
  index_ASC
  index_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TrackPreviousValues {
  id: ID!
  index: Int
}

enum TrackSource {
  YOUTUBE
  SOUNDCLOUD
}

type TrackSubscriptionPayload {
  mutation: MutationType!
  node: Track
  updatedFields: [String!]
  previousValues: TrackPreviousValues
}

input TrackSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TrackSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TrackSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TrackSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TrackWhereInput
}

input TrackUpdateInput {
  index: Int
  info: TrackInfoUpdateOneInput
  playlist: PlaylistUpdateOneWithoutTracksInput
  controls: RemoteControlUpdateManyWithoutSongInput
}

input TrackUpdateManyWithoutPlaylistInput {
  create: [TrackCreateWithoutPlaylistInput!]
  connect: [TrackWhereUniqueInput!]
  disconnect: [TrackWhereUniqueInput!]
  delete: [TrackWhereUniqueInput!]
  update: [TrackUpdateWithWhereUniqueWithoutPlaylistInput!]
  upsert: [TrackUpsertWithWhereUniqueWithoutPlaylistInput!]
}

input TrackUpdateOneWithoutControlsInput {
  create: TrackCreateWithoutControlsInput
  connect: TrackWhereUniqueInput
  delete: Boolean
  update: TrackUpdateWithoutControlsDataInput
  upsert: TrackUpsertWithoutControlsInput
}

input TrackUpdateWithoutControlsDataInput {
  index: Int
  info: TrackInfoUpdateOneInput
  playlist: PlaylistUpdateOneWithoutTracksInput
}

input TrackUpdateWithoutPlaylistDataInput {
  index: Int
  info: TrackInfoUpdateOneInput
  controls: RemoteControlUpdateManyWithoutSongInput
}

input TrackUpdateWithWhereUniqueWithoutPlaylistInput {
  where: TrackWhereUniqueInput!
  data: TrackUpdateWithoutPlaylistDataInput!
}

input TrackUpsertWithoutControlsInput {
  update: TrackUpdateWithoutControlsDataInput!
  create: TrackCreateWithoutControlsInput!
}

input TrackUpsertWithWhereUniqueWithoutPlaylistInput {
  where: TrackWhereUniqueInput!
  update: TrackUpdateWithoutPlaylistDataInput!
  create: TrackCreateWithoutPlaylistInput!
}

input TrackWhereInput {
  """Logical AND on all given filters."""
  AND: [TrackWhereInput!]

  """Logical OR on all given filters."""
  OR: [TrackWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TrackWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  index: Int

  """All values that are not equal to given value."""
  index_not: Int

  """All values that are contained in given list."""
  index_in: [Int!]

  """All values that are not contained in given list."""
  index_not_in: [Int!]

  """All values less than the given value."""
  index_lt: Int

  """All values less than or equal the given value."""
  index_lte: Int

  """All values greater than the given value."""
  index_gt: Int

  """All values greater than or equal the given value."""
  index_gte: Int
  info: TrackInfoWhereInput
  playlist: PlaylistWhereInput
  controls_every: RemoteControlWhereInput
  controls_some: RemoteControlWhereInput
  controls_none: RemoteControlWhereInput
}

input TrackWhereUniqueInput {
  id: ID
}
`;
exports.Prisma = prisma_binding_1.makePrismaBindingClass({typeDefs});
