declare global {
  declare namespace Route {
    export type Endpoint = '/api/posts/:id' | '/api/posts' | '/'
  }
  declare namespace Environment {
    export type Key = 
  }
}

export {};