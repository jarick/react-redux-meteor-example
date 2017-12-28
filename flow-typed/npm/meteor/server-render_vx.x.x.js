declare module "meteor/server-render" {
  declare type Sink = {
    request: {
      url: string
    };
    arch?: string;
    head?: string;
    body?: string;
    htmlById?: { [key: string]: string };
    maybeMadeChanges?: boolean;

    setStatusCode(code: number): void;

    appendToHead(html: string): void;

    appendToBody(html: string): void;

    appendToElementById(id: string, html: string): void;

    renderIntoElementById(id: string, html: string): void;
  }

  declare function onPageLoad(f: (sink: Sink) => void): Promise<any> | any;
}
