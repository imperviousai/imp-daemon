package ipfs

var SwaggerJSON = `
{
  "swagger": "2.0",
  "info": {
    "title": "IPFS Services",
    "version": "1.0",
    "contact": {
      "name": "Impervious AI",
      "url": "https://impervious.ai"
    }
  },
  "tags": [
    {
      "name": "IPFS"
    }
  ],
  "schemes": [
    "http",
    "https",
    "wss"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/v1/ipfs/add": {
      "post": {
        "summary": "*\nAddFile will add data to a file and pin to IPFS to return it's CID.",
        "operationId": "IPFS_AddFile",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ipfsAddFileResponse"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ipfsAddFileRequest"
            }
          }
        ],
        "tags": [
          "IPFS"
        ]
      }
    },
    "/v1/ipfs/list": {
      "get": {
        "summary": "*\nListFiles lists all of the files pinned locally.",
        "operationId": "IPFS_ListFiles",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ipfsListFilesResponse"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "tags": [
          "IPFS"
        ]
      }
    },
    "/v1/ipfs/{cid}": {
      "get": {
        "summary": "*\nRetrieveFile will retrieve a file from the IPFS network.",
        "operationId": "IPFS_GetFile2",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ipfsGetFileResponse"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "cid",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "protocol",
            "in": "query",
            "required": false,
            "type": "string"
          }
        ],
        "tags": [
          "IPFS"
        ]
      }
    },
    "/v1/ipfs/{protocol}/{cid}": {
      "get": {
        "summary": "*\nRetrieveFile will retrieve a file from the IPFS network.",
        "operationId": "IPFS_GetFile",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ipfsGetFileResponse"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "protocol",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "cid",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "tags": [
          "IPFS"
        ]
      }
    }
  },
  "definitions": {
    "ipfsAddFileRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "data": {
          "type": "string",
          "format": "byte"
        },
        "updatable": {
          "type": "boolean"
        }
      },
      "description": "*\nRepresents a request to add a file to IPFS."
    },
    "ipfsAddFileResponse": {
      "type": "object",
      "properties": {
        "cid": {
          "type": "string"
        }
      },
      "description": "*\nRepresents a response containing the content ID of the added IPFS file."
    },
    "ipfsGetFileResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "string",
          "format": "byte"
        }
      },
      "description": "*\nRepresents a response containing the contents of the retrieved file."
    },
    "ipfsListFilesResponse": {
      "type": "object",
      "properties": {
        "files": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "description": "*\nRepresents a response containing a list of the files."
    },
    "protobufAny": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string"
        }
      },
      "additionalProperties": {}
    },
    "rpcStatus": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "details": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/protobufAny"
          }
        }
      }
    }
  },
  "securityDefinitions": {
    "api_key": {
      "type": "apiKey",
      "description": "An API key generated by the daemon for authentication",
      "name": "Grpc-Metadata-X-API-KEY"
    }
  },
  "security": [
    {
      "api_key": []
    }
  ],
  "externalDocs": {
    "description": "Documentation on IMP",
    "url": "https://docs.impervious.ai"
  }
}
`
