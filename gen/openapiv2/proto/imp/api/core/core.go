package core

var SwaggerJSON = `
{
  "swagger": "2.0",
  "info": {
    "title": "Core Services",
    "version": "1.0",
    "contact": {
      "name": "Impervious AI",
      "url": "https://impervious.ai"
    }
  },
  "tags": [
    {
      "name": "Core"
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
    "/v1/core/status": {
      "get": {
        "summary": "*\nStatus gives the status of various services the daemon is running.",
        "operationId": "Core_Status",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/coreStatusResponse"
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
          "Core"
        ]
      }
    }
  },
  "definitions": {
    "coreKeyStatus": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string"
        }
      }
    },
    "coreStatusResponse": {
      "type": "object",
      "properties": {
        "keyStatus": {
          "$ref": "#/definitions/coreKeyStatus"
        }
      },
      "description": "*\nRepresents a response back from a status request."
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
