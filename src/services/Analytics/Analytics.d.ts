export interface UserDetail {
  user_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  query_count: number;
  queries: string[];
}

export interface UnresolvedQuery {
  intent: string;
  times_asked: number;
  first_occurrence: string;
  last_occurrence: string;
  user_details: UserDetail[];
}

export interface GroupUnresolved {
  group_id: number;
  group_name: string;
  unresolved_queries: UnresolvedQuery[];
}

export interface GroupWiseUnresolvedQueriesData {
  group_wise: GroupUnresolved[];
}

export interface GroupedUnresolvedQueries {
  [intent: string]: UnresolvedQuery[];
}

export interface Intent {
  intent: string;
  percentage: number;
  resolved: number;
  unresolved: number;
}

export interface GroupIntent {
  group_id: number;
  group_name: string;
  total_intents: number;
  intents: Intent[];
}

export interface GroupWiseIntentsData {
  total_intents: number;
  group_wise: GroupIntent[];
}

export interface GroupQuery {
  group_id: number;
  group_name: string;
  queries: number;
  resolved: number;
  unresolved: number;
  percentage: number;
}

export interface GroupWiseQueriesData {
  total_queries: number;
  resolved: number;
  unresolved: number;
  group_wise: GroupQuery[];
}

export interface GroupWiseUsersData {
  total_users: number;
  group_wise: {
    group_id: number;
    group_name: string;
    users_count: number;
    users: UserDetail[];
  }[];
}
