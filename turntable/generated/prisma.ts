import {GraphQLResolveInfo, GraphQLSchema} from 'graphql';
import {IResolvers} from 'graphql-tools/dist/Interfaces';
import {Options} from 'graphql-binding';
import {makePrismaBindingClass, BasePrismaOptions} from 'prisma-binding';

export interface Query {
  tracks: <T = Array<Track | null>>(
    args: {
      where?: TrackWhereInput | null;
      orderBy?: TrackOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  playlists: <T = Array<Playlist | null>>(
    args: {
      where?: PlaylistWhereInput | null;
      orderBy?: PlaylistOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  remoteControls: <T = Array<RemoteControl | null>>(
    args: {
      where?: RemoteControlWhereInput | null;
      orderBy?: RemoteControlOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  migrations: <T = Array<Migration | null>>(
    args: {
      where?: MigrationWhereInput | null;
      orderBy?: MigrationOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  trackInfoes: <T = Array<TrackInfo | null>>(
    args: {
      where?: TrackInfoWhereInput | null;
      orderBy?: TrackInfoOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  track: <T = Track | null>(
    args: {where: TrackWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  playlist: <T = Playlist | null>(
    args: {where: PlaylistWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  remoteControl: <T = RemoteControl | null>(
    args: {where: RemoteControlWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  migration: <T = Migration | null>(
    args: {where: MigrationWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  trackInfo: <T = TrackInfo | null>(
    args: {where: TrackInfoWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  tracksConnection: <T = TrackConnection>(
    args: {
      where?: TrackWhereInput | null;
      orderBy?: TrackOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  playlistsConnection: <T = PlaylistConnection>(
    args: {
      where?: PlaylistWhereInput | null;
      orderBy?: PlaylistOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  remoteControlsConnection: <T = RemoteControlConnection>(
    args: {
      where?: RemoteControlWhereInput | null;
      orderBy?: RemoteControlOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  migrationsConnection: <T = MigrationConnection>(
    args: {
      where?: MigrationWhereInput | null;
      orderBy?: MigrationOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  trackInfoesConnection: <T = TrackInfoConnection>(
    args: {
      where?: TrackInfoWhereInput | null;
      orderBy?: TrackInfoOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  node: <T = Node | null>(
    args: {id: ID_Output},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
}

export interface Mutation {
  createTrack: <T = Track>(
    args: {data: TrackCreateInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  createPlaylist: <T = Playlist>(
    args: {data: PlaylistCreateInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  createRemoteControl: <T = RemoteControl>(
    args: {data: RemoteControlCreateInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  createMigration: <T = Migration>(
    args: {data: MigrationCreateInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  createTrackInfo: <T = TrackInfo>(
    args: {data: TrackInfoCreateInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  updateTrack: <T = Track | null>(
    args: {data: TrackUpdateInput; where: TrackWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  updatePlaylist: <T = Playlist | null>(
    args: {data: PlaylistUpdateInput; where: PlaylistWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  updateRemoteControl: <T = RemoteControl | null>(
    args: {data: RemoteControlUpdateInput; where: RemoteControlWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  updateMigration: <T = Migration | null>(
    args: {data: MigrationUpdateInput; where: MigrationWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  updateTrackInfo: <T = TrackInfo | null>(
    args: {data: TrackInfoUpdateInput; where: TrackInfoWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  deleteTrack: <T = Track | null>(
    args: {where: TrackWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  deletePlaylist: <T = Playlist | null>(
    args: {where: PlaylistWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  deleteRemoteControl: <T = RemoteControl | null>(
    args: {where: RemoteControlWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  deleteMigration: <T = Migration | null>(
    args: {where: MigrationWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  deleteTrackInfo: <T = TrackInfo | null>(
    args: {where: TrackInfoWhereUniqueInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T | null>;
  upsertTrack: <T = Track>(
    args: {where: TrackWhereUniqueInput; create: TrackCreateInput; update: TrackUpdateInput},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  upsertPlaylist: <T = Playlist>(
    args: {
      where: PlaylistWhereUniqueInput;
      create: PlaylistCreateInput;
      update: PlaylistUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  upsertRemoteControl: <T = RemoteControl>(
    args: {
      where: RemoteControlWhereUniqueInput;
      create: RemoteControlCreateInput;
      update: RemoteControlUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  upsertMigration: <T = Migration>(
    args: {
      where: MigrationWhereUniqueInput;
      create: MigrationCreateInput;
      update: MigrationUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  upsertTrackInfo: <T = TrackInfo>(
    args: {
      where: TrackInfoWhereUniqueInput;
      create: TrackInfoCreateInput;
      update: TrackInfoUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  updateManyTracks: <T = BatchPayload>(
    args: {data: TrackUpdateInput; where?: TrackWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  updateManyPlaylists: <T = BatchPayload>(
    args: {data: PlaylistUpdateInput; where?: PlaylistWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  updateManyRemoteControls: <T = BatchPayload>(
    args: {data: RemoteControlUpdateInput; where?: RemoteControlWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  updateManyMigrations: <T = BatchPayload>(
    args: {data: MigrationUpdateInput; where?: MigrationWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  updateManyTrackInfoes: <T = BatchPayload>(
    args: {data: TrackInfoUpdateInput; where?: TrackInfoWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  deleteManyTracks: <T = BatchPayload>(
    args: {where?: TrackWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  deleteManyPlaylists: <T = BatchPayload>(
    args: {where?: PlaylistWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  deleteManyRemoteControls: <T = BatchPayload>(
    args: {where?: RemoteControlWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  deleteManyMigrations: <T = BatchPayload>(
    args: {where?: MigrationWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  deleteManyTrackInfoes: <T = BatchPayload>(
    args: {where?: TrackInfoWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
}

export interface Subscription {
  track: <T = TrackSubscriptionPayload | null>(
    args: {where?: TrackSubscriptionWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T | null>>;
  playlist: <T = PlaylistSubscriptionPayload | null>(
    args: {where?: PlaylistSubscriptionWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T | null>>;
  remoteControl: <T = RemoteControlSubscriptionPayload | null>(
    args: {where?: RemoteControlSubscriptionWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T | null>>;
  migration: <T = MigrationSubscriptionPayload | null>(
    args: {where?: MigrationSubscriptionWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T | null>>;
  trackInfo: <T = TrackInfoSubscriptionPayload | null>(
    args: {where?: TrackInfoSubscriptionWhereInput | null},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T | null>>;
}

export interface Exists {
  Track: (where?: TrackWhereInput) => Promise<boolean>;
  Playlist: (where?: PlaylistWhereInput) => Promise<boolean>;
  RemoteControl: (where?: RemoteControlWhereInput) => Promise<boolean>;
  Migration: (where?: MigrationWhereInput) => Promise<boolean>;
  TrackInfo: (where?: TrackInfoWhereInput) => Promise<boolean>;
}

export interface Prisma {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  exists: Exists;
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>;
  delegate(
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<any>;
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new (options: BasePrismaOptions): T;
}
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

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs});

/**
 * Types
 */

export type ControlAction = 'PLAY' | 'PAUSE' | 'SET';

export type MigrationOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'index_ASC'
  | 'index_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC';

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED';

export type PlaylistOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC';

export type RemoteControlOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'action_ASC'
  | 'action_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC';

export type TrackInfoOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'thumbnail_ASC'
  | 'thumbnail_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'url_ASC'
  | 'url_DESC'
  | 'source_ASC'
  | 'source_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC';

export type TrackOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'index_ASC'
  | 'index_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC';

export type TrackSource = 'YOUTUBE' | 'SOUNDCLOUD';

export interface MigrationCreateInput {
  index?: Int | null;
  name: String;
}

export interface MigrationSubscriptionWhereInput {
  AND?: MigrationSubscriptionWhereInput[] | MigrationSubscriptionWhereInput | null;
  OR?: MigrationSubscriptionWhereInput[] | MigrationSubscriptionWhereInput | null;
  NOT?: MigrationSubscriptionWhereInput[] | MigrationSubscriptionWhereInput | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: MigrationWhereInput | null;
}

export interface MigrationUpdateInput {
  index?: Int | null;
  name?: String | null;
}

export interface MigrationWhereInput {
  AND?: MigrationWhereInput[] | MigrationWhereInput | null;
  OR?: MigrationWhereInput[] | MigrationWhereInput | null;
  NOT?: MigrationWhereInput[] | MigrationWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  index?: Int | null;
  index_not?: Int | null;
  index_in?: Int[] | Int | null;
  index_not_in?: Int[] | Int | null;
  index_lt?: Int | null;
  index_lte?: Int | null;
  index_gt?: Int | null;
  index_gte?: Int | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
}

export interface MigrationWhereUniqueInput {
  id?: ID_Input | null;
  index?: Int | null;
}

export interface PlaylistCreateInput {
  name: String;
  tracks?: TrackCreateManyWithoutPlaylistInput | null;
}

export interface PlaylistCreateOneWithoutTracksInput {
  create?: PlaylistCreateWithoutTracksInput | null;
  connect?: PlaylistWhereUniqueInput | null;
}

export interface PlaylistCreateWithoutTracksInput {
  name: String;
}

export interface PlaylistSubscriptionWhereInput {
  AND?: PlaylistSubscriptionWhereInput[] | PlaylistSubscriptionWhereInput | null;
  OR?: PlaylistSubscriptionWhereInput[] | PlaylistSubscriptionWhereInput | null;
  NOT?: PlaylistSubscriptionWhereInput[] | PlaylistSubscriptionWhereInput | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: PlaylistWhereInput | null;
}

export interface PlaylistUpdateInput {
  name?: String | null;
  tracks?: TrackUpdateManyWithoutPlaylistInput | null;
}

export interface PlaylistUpdateOneWithoutTracksInput {
  create?: PlaylistCreateWithoutTracksInput | null;
  connect?: PlaylistWhereUniqueInput | null;
  delete?: Boolean | null;
  update?: PlaylistUpdateWithoutTracksDataInput | null;
  upsert?: PlaylistUpsertWithoutTracksInput | null;
}

export interface PlaylistUpdateWithoutTracksDataInput {
  name?: String | null;
}

export interface PlaylistUpsertWithoutTracksInput {
  update: PlaylistUpdateWithoutTracksDataInput;
  create: PlaylistCreateWithoutTracksInput;
}

export interface PlaylistWhereInput {
  AND?: PlaylistWhereInput[] | PlaylistWhereInput | null;
  OR?: PlaylistWhereInput[] | PlaylistWhereInput | null;
  NOT?: PlaylistWhereInput[] | PlaylistWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
  tracks_every?: TrackWhereInput | null;
  tracks_some?: TrackWhereInput | null;
  tracks_none?: TrackWhereInput | null;
}

export interface PlaylistWhereUniqueInput {
  id?: ID_Input | null;
  name?: String | null;
}

export interface RemoteControlCreateInput {
  action: ControlAction;
  song: TrackCreateOneWithoutControlsInput;
}

export interface RemoteControlCreateManyWithoutSongInput {
  create?: RemoteControlCreateWithoutSongInput[] | RemoteControlCreateWithoutSongInput | null;
  connect?: RemoteControlWhereUniqueInput[] | RemoteControlWhereUniqueInput | null;
}

export interface RemoteControlCreateWithoutSongInput {
  action: ControlAction;
}

export interface RemoteControlSubscriptionWhereInput {
  AND?: RemoteControlSubscriptionWhereInput[] | RemoteControlSubscriptionWhereInput | null;
  OR?: RemoteControlSubscriptionWhereInput[] | RemoteControlSubscriptionWhereInput | null;
  NOT?: RemoteControlSubscriptionWhereInput[] | RemoteControlSubscriptionWhereInput | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: RemoteControlWhereInput | null;
}

export interface RemoteControlUpdateInput {
  action?: ControlAction | null;
  song?: TrackUpdateOneWithoutControlsInput | null;
}

export interface RemoteControlUpdateManyWithoutSongInput {
  create?: RemoteControlCreateWithoutSongInput[] | RemoteControlCreateWithoutSongInput | null;
  connect?: RemoteControlWhereUniqueInput[] | RemoteControlWhereUniqueInput | null;
  disconnect?: RemoteControlWhereUniqueInput[] | RemoteControlWhereUniqueInput | null;
  delete?: RemoteControlWhereUniqueInput[] | RemoteControlWhereUniqueInput | null;
  update?:
    | RemoteControlUpdateWithWhereUniqueWithoutSongInput[]
    | RemoteControlUpdateWithWhereUniqueWithoutSongInput
    | null;
  upsert?:
    | RemoteControlUpsertWithWhereUniqueWithoutSongInput[]
    | RemoteControlUpsertWithWhereUniqueWithoutSongInput
    | null;
}

export interface RemoteControlUpdateWithoutSongDataInput {
  action?: ControlAction | null;
}

export interface RemoteControlUpdateWithWhereUniqueWithoutSongInput {
  where: RemoteControlWhereUniqueInput;
  data: RemoteControlUpdateWithoutSongDataInput;
}

export interface RemoteControlUpsertWithWhereUniqueWithoutSongInput {
  where: RemoteControlWhereUniqueInput;
  update: RemoteControlUpdateWithoutSongDataInput;
  create: RemoteControlCreateWithoutSongInput;
}

export interface RemoteControlWhereInput {
  AND?: RemoteControlWhereInput[] | RemoteControlWhereInput | null;
  OR?: RemoteControlWhereInput[] | RemoteControlWhereInput | null;
  NOT?: RemoteControlWhereInput[] | RemoteControlWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  action?: ControlAction | null;
  action_not?: ControlAction | null;
  action_in?: ControlAction[] | ControlAction | null;
  action_not_in?: ControlAction[] | ControlAction | null;
  song?: TrackWhereInput | null;
}

export interface RemoteControlWhereUniqueInput {
  id?: ID_Input | null;
}

export interface TrackCreateInput {
  index?: Int | null;
  info: TrackInfoCreateOneInput;
  playlist: PlaylistCreateOneWithoutTracksInput;
  controls?: RemoteControlCreateManyWithoutSongInput | null;
}

export interface TrackCreateManyWithoutPlaylistInput {
  create?: TrackCreateWithoutPlaylistInput[] | TrackCreateWithoutPlaylistInput | null;
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput | null;
}

export interface TrackCreateOneWithoutControlsInput {
  create?: TrackCreateWithoutControlsInput | null;
  connect?: TrackWhereUniqueInput | null;
}

export interface TrackCreateWithoutControlsInput {
  index?: Int | null;
  info: TrackInfoCreateOneInput;
  playlist: PlaylistCreateOneWithoutTracksInput;
}

export interface TrackCreateWithoutPlaylistInput {
  index?: Int | null;
  info: TrackInfoCreateOneInput;
  controls?: RemoteControlCreateManyWithoutSongInput | null;
}

export interface TrackInfoCreateInput {
  thumbnail?: String | null;
  title: String;
  description?: String | null;
  url: String;
  source: TrackSource;
}

export interface TrackInfoCreateOneInput {
  create?: TrackInfoCreateInput | null;
  connect?: TrackInfoWhereUniqueInput | null;
}

export interface TrackInfoSubscriptionWhereInput {
  AND?: TrackInfoSubscriptionWhereInput[] | TrackInfoSubscriptionWhereInput | null;
  OR?: TrackInfoSubscriptionWhereInput[] | TrackInfoSubscriptionWhereInput | null;
  NOT?: TrackInfoSubscriptionWhereInput[] | TrackInfoSubscriptionWhereInput | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: TrackInfoWhereInput | null;
}

export interface TrackInfoUpdateDataInput {
  thumbnail?: String | null;
  title?: String | null;
  description?: String | null;
  url?: String | null;
  source?: TrackSource | null;
}

export interface TrackInfoUpdateInput {
  thumbnail?: String | null;
  title?: String | null;
  description?: String | null;
  url?: String | null;
  source?: TrackSource | null;
}

export interface TrackInfoUpdateOneInput {
  create?: TrackInfoCreateInput | null;
  connect?: TrackInfoWhereUniqueInput | null;
  delete?: Boolean | null;
  update?: TrackInfoUpdateDataInput | null;
  upsert?: TrackInfoUpsertNestedInput | null;
}

export interface TrackInfoUpsertNestedInput {
  update: TrackInfoUpdateDataInput;
  create: TrackInfoCreateInput;
}

export interface TrackInfoWhereInput {
  AND?: TrackInfoWhereInput[] | TrackInfoWhereInput | null;
  OR?: TrackInfoWhereInput[] | TrackInfoWhereInput | null;
  NOT?: TrackInfoWhereInput[] | TrackInfoWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  thumbnail?: String | null;
  thumbnail_not?: String | null;
  thumbnail_in?: String[] | String | null;
  thumbnail_not_in?: String[] | String | null;
  thumbnail_lt?: String | null;
  thumbnail_lte?: String | null;
  thumbnail_gt?: String | null;
  thumbnail_gte?: String | null;
  thumbnail_contains?: String | null;
  thumbnail_not_contains?: String | null;
  thumbnail_starts_with?: String | null;
  thumbnail_not_starts_with?: String | null;
  thumbnail_ends_with?: String | null;
  thumbnail_not_ends_with?: String | null;
  title?: String | null;
  title_not?: String | null;
  title_in?: String[] | String | null;
  title_not_in?: String[] | String | null;
  title_lt?: String | null;
  title_lte?: String | null;
  title_gt?: String | null;
  title_gte?: String | null;
  title_contains?: String | null;
  title_not_contains?: String | null;
  title_starts_with?: String | null;
  title_not_starts_with?: String | null;
  title_ends_with?: String | null;
  title_not_ends_with?: String | null;
  description?: String | null;
  description_not?: String | null;
  description_in?: String[] | String | null;
  description_not_in?: String[] | String | null;
  description_lt?: String | null;
  description_lte?: String | null;
  description_gt?: String | null;
  description_gte?: String | null;
  description_contains?: String | null;
  description_not_contains?: String | null;
  description_starts_with?: String | null;
  description_not_starts_with?: String | null;
  description_ends_with?: String | null;
  description_not_ends_with?: String | null;
  url?: String | null;
  url_not?: String | null;
  url_in?: String[] | String | null;
  url_not_in?: String[] | String | null;
  url_lt?: String | null;
  url_lte?: String | null;
  url_gt?: String | null;
  url_gte?: String | null;
  url_contains?: String | null;
  url_not_contains?: String | null;
  url_starts_with?: String | null;
  url_not_starts_with?: String | null;
  url_ends_with?: String | null;
  url_not_ends_with?: String | null;
  source?: TrackSource | null;
  source_not?: TrackSource | null;
  source_in?: TrackSource[] | TrackSource | null;
  source_not_in?: TrackSource[] | TrackSource | null;
}

export interface TrackInfoWhereUniqueInput {
  id?: ID_Input | null;
  url?: String | null;
}

export interface TrackSubscriptionWhereInput {
  AND?: TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput | null;
  OR?: TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput | null;
  NOT?: TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: TrackWhereInput | null;
}

export interface TrackUpdateInput {
  index?: Int | null;
  info?: TrackInfoUpdateOneInput | null;
  playlist?: PlaylistUpdateOneWithoutTracksInput | null;
  controls?: RemoteControlUpdateManyWithoutSongInput | null;
}

export interface TrackUpdateManyWithoutPlaylistInput {
  create?: TrackCreateWithoutPlaylistInput[] | TrackCreateWithoutPlaylistInput | null;
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput | null;
  disconnect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput | null;
  delete?: TrackWhereUniqueInput[] | TrackWhereUniqueInput | null;
  update?:
    | TrackUpdateWithWhereUniqueWithoutPlaylistInput[]
    | TrackUpdateWithWhereUniqueWithoutPlaylistInput
    | null;
  upsert?:
    | TrackUpsertWithWhereUniqueWithoutPlaylistInput[]
    | TrackUpsertWithWhereUniqueWithoutPlaylistInput
    | null;
}

export interface TrackUpdateOneWithoutControlsInput {
  create?: TrackCreateWithoutControlsInput | null;
  connect?: TrackWhereUniqueInput | null;
  delete?: Boolean | null;
  update?: TrackUpdateWithoutControlsDataInput | null;
  upsert?: TrackUpsertWithoutControlsInput | null;
}

export interface TrackUpdateWithoutControlsDataInput {
  index?: Int | null;
  info?: TrackInfoUpdateOneInput | null;
  playlist?: PlaylistUpdateOneWithoutTracksInput | null;
}

export interface TrackUpdateWithoutPlaylistDataInput {
  index?: Int | null;
  info?: TrackInfoUpdateOneInput | null;
  controls?: RemoteControlUpdateManyWithoutSongInput | null;
}

export interface TrackUpdateWithWhereUniqueWithoutPlaylistInput {
  where: TrackWhereUniqueInput;
  data: TrackUpdateWithoutPlaylistDataInput;
}

export interface TrackUpsertWithoutControlsInput {
  update: TrackUpdateWithoutControlsDataInput;
  create: TrackCreateWithoutControlsInput;
}

export interface TrackUpsertWithWhereUniqueWithoutPlaylistInput {
  where: TrackWhereUniqueInput;
  update: TrackUpdateWithoutPlaylistDataInput;
  create: TrackCreateWithoutPlaylistInput;
}

export interface TrackWhereInput {
  AND?: TrackWhereInput[] | TrackWhereInput | null;
  OR?: TrackWhereInput[] | TrackWhereInput | null;
  NOT?: TrackWhereInput[] | TrackWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  index?: Int | null;
  index_not?: Int | null;
  index_in?: Int[] | Int | null;
  index_not_in?: Int[] | Int | null;
  index_lt?: Int | null;
  index_lte?: Int | null;
  index_gt?: Int | null;
  index_gte?: Int | null;
  info?: TrackInfoWhereInput | null;
  playlist?: PlaylistWhereInput | null;
  controls_every?: RemoteControlWhereInput | null;
  controls_some?: RemoteControlWhereInput | null;
  controls_none?: RemoteControlWhereInput | null;
}

export interface TrackWhereUniqueInput {
  id?: ID_Input | null;
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output;
}

export interface AggregateMigration {
  count: Int;
}

export interface AggregatePlaylist {
  count: Int;
}

export interface AggregateRemoteControl {
  count: Int;
}

export interface AggregateTrack {
  count: Int;
}

export interface AggregateTrackInfo {
  count: Int;
}

export interface BatchPayload {
  count: Long;
}

export interface Migration extends Node {
  id: ID_Output;
  index?: Int | null;
  name: String;
}

/*
 * A connection to a list of items.

 */
export interface MigrationConnection {
  pageInfo: PageInfo;
  edges: Array<MigrationEdge | null>;
  aggregate: AggregateMigration;
}

/*
 * An edge in a connection.

 */
export interface MigrationEdge {
  node: Migration;
  cursor: String;
}

export interface MigrationPreviousValues {
  id: ID_Output;
  index?: Int | null;
  name: String;
}

export interface MigrationSubscriptionPayload {
  mutation: MutationType;
  node?: Migration | null;
  updatedFields?: Array<String> | null;
  previousValues?: MigrationPreviousValues | null;
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String | null;
  endCursor?: String | null;
}

export interface Playlist extends Node {
  id: ID_Output;
  name: String;
  tracks?: Array<Track> | null;
}

/*
 * A connection to a list of items.

 */
export interface PlaylistConnection {
  pageInfo: PageInfo;
  edges: Array<PlaylistEdge | null>;
  aggregate: AggregatePlaylist;
}

/*
 * An edge in a connection.

 */
export interface PlaylistEdge {
  node: Playlist;
  cursor: String;
}

export interface PlaylistPreviousValues {
  id: ID_Output;
  name: String;
}

export interface PlaylistSubscriptionPayload {
  mutation: MutationType;
  node?: Playlist | null;
  updatedFields?: Array<String> | null;
  previousValues?: PlaylistPreviousValues | null;
}

export interface RemoteControl extends Node {
  id: ID_Output;
  song: Track;
  action: ControlAction;
}

/*
 * A connection to a list of items.

 */
export interface RemoteControlConnection {
  pageInfo: PageInfo;
  edges: Array<RemoteControlEdge | null>;
  aggregate: AggregateRemoteControl;
}

/*
 * An edge in a connection.

 */
export interface RemoteControlEdge {
  node: RemoteControl;
  cursor: String;
}

export interface RemoteControlPreviousValues {
  id: ID_Output;
  action: ControlAction;
}

export interface RemoteControlSubscriptionPayload {
  mutation: MutationType;
  node?: RemoteControl | null;
  updatedFields?: Array<String> | null;
  previousValues?: RemoteControlPreviousValues | null;
}

export interface Track extends Node {
  id: ID_Output;
  info: TrackInfo;
  playlist: Playlist;
  index?: Int | null;
  controls?: Array<RemoteControl> | null;
}

/*
 * A connection to a list of items.

 */
export interface TrackConnection {
  pageInfo: PageInfo;
  edges: Array<TrackEdge | null>;
  aggregate: AggregateTrack;
}

/*
 * An edge in a connection.

 */
export interface TrackEdge {
  node: Track;
  cursor: String;
}

export interface TrackInfo extends Node {
  id: ID_Output;
  thumbnail?: String | null;
  title: String;
  description?: String | null;
  url: String;
  source: TrackSource;
}

/*
 * A connection to a list of items.

 */
export interface TrackInfoConnection {
  pageInfo: PageInfo;
  edges: Array<TrackInfoEdge | null>;
  aggregate: AggregateTrackInfo;
}

/*
 * An edge in a connection.

 */
export interface TrackInfoEdge {
  node: TrackInfo;
  cursor: String;
}

export interface TrackInfoPreviousValues {
  id: ID_Output;
  thumbnail?: String | null;
  title: String;
  description?: String | null;
  url: String;
  source: TrackSource;
}

export interface TrackInfoSubscriptionPayload {
  mutation: MutationType;
  node?: TrackInfo | null;
  updatedFields?: Array<String> | null;
  previousValues?: TrackInfoPreviousValues | null;
}

export interface TrackPreviousValues {
  id: ID_Output;
  index?: Int | null;
}

export interface TrackSubscriptionPayload {
  mutation: MutationType;
  node?: Track | null;
  updatedFields?: Array<String> | null;
  previousValues?: TrackPreviousValues | null;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;
