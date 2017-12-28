// flow-typed signature: 5b40bd9398af5a21f58f5ad49f50f849
// flow-typed version: f0074da681/md5_v1.0.x/flow_>=v0.25.x

// @flow

declare module "md5" {
  declare module.exports: (
    message: string | Buffer,
    options?: {
      asString?: boolean,
      asBytes?: boolean,
      encoding?: string
    }
  ) => string;
}
