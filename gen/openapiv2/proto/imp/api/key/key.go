package key

var SwaggerJSON = `
{
  "swagger": "2.0",
  "info": {
    "title": "Key Services",
    "version": "1.0",
    "contact": {
      "name": "Impervious AI",
      "url": "https://impervious.ai"
    }
  },
  "tags": [
    {
      "name": "Key"
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
    "/v1/key/initSeed": {
      "post": {
        "summary": "*\nInitSeed initializes the master seed for the daemon, and encrypts using the passphrase.",
        "operationId": "Key_InitSeed",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/keyInitSeedResponse"
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
              "$ref": "#/definitions/keyInitSeedRequest"
            }
          }
        ],
        "tags": [
          "Key"
        ]
      }
    },
    "/v1/key/status": {
      "get": {
        "summary": "*\nStatus gives the status of the daemon db/key.",
        "operationId": "Key_Status",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/keyStatusResponse"
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
          "Key"
        ]
      }
    },
    "/v1/key/unlockSeed": {
      "post": {
        "summary": "*\nUnlockSeed unlocks the master seed for the daemon, and decrypts using the passphrase.",
        "operationId": "Key_UnlockSeed",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/keyUnlockSeedResponse"
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
              "$ref": "#/definitions/keyUnlockSeedRequest"
            }
          }
        ],
        "tags": [
          "Key"
        ]
      }
    }
  },
  "definitions": {
    "keyInitSeedRequest": {
      "type": "object",
      "properties": {
        "mnenomic": {
          "type": "string"
        },
        "passphrase": {
          "type": "string"
        }
      },
      "description": "*\nRepresents an init seed request to initialize the master seed."
    },
    "keyInitSeedResponse": {
      "type": "object",
      "properties": {
        "mnenomic": {
          "type": "string"
        },
        "apiKey": {
          "type": "string"
        }
      },
      "description": "*\nRepresents a response back from an init seed request."
    },
    "keyStatusResponse": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string"
        }
      },
      "description": "*\nRepresents a response back from a status request."
    },
    "keyUnlockSeedRequest": {
      "type": "object",
      "properties": {
        "passphrase": {
          "type": "string"
        }
      },
      "description": "*\nRepresents an unlock seed request to unlock the master seed."
    },
    "keyUnlockSeedResponse": {
      "type": "object",
      "properties": {
        "apiKey": {
          "type": "string"
        }
      },
      "description": "*\nRepresents a response back from an unlock seed request."
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
