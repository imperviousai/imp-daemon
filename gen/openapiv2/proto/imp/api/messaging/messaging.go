package messaging

var SwaggerJSON = `
{
  "swagger": "2.0",
  "info": {
    "title": "Messaging Services",
    "version": "1.0",
    "contact": {
      "name": "Impervious AI",
      "url": "https://impervious.ai"
    }
  },
  "tags": [
    {
      "name": "Messaging"
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
    "/v1/message": {
      "get": {
        "summary": "*\nGetMessageList gets messages from the daemon.",
        "operationId": "Messaging_GetMessageList",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/messagingGetMessageListResponse"
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
            "name": "id",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "type",
            "in": "query",
            "required": false,
            "type": "string"
          }
        ],
        "tags": [
          "Messaging"
        ]
      }
    },
    "/v1/message/send": {
      "post": {
        "summary": "*\nSendMessage sends a text message to another node.",
        "operationId": "Messaging_SendMessage",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/messagingSendMessageResponse"
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
              "$ref": "#/definitions/messagingSendMessageRequest"
            }
          }
        ],
        "tags": [
          "Messaging"
        ]
      }
    },
    "/v1/message/{id}": {
      "delete": {
        "summary": "*\nDeleteMessage will delete a specific message.",
        "operationId": "Messaging_DeleteMessage",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/messagingDeleteMessageResponse"
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
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "tags": [
          "Messaging"
        ]
      }
    },
    "/v1/message_group/{groupId}": {
      "delete": {
        "summary": "*\nDeleteGroupMessage will delete all messages from the same group.",
        "operationId": "Messaging_DeleteGroupMessage",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/messagingDeleteGroupMessageResponse"
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
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "tags": [
          "Messaging"
        ]
      }
    },
    "/v2/message/save": {
      "post": {
        "summary": "*\nSaveMessageV2 saves a byte-encoded json DIDComm message locally.",
        "operationId": "Messaging_SaveMessageV2",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/messagingSaveMessageV2Response"
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
              "$ref": "#/definitions/messagingSaveMessageV2Request"
            }
          }
        ],
        "tags": [
          "Messaging"
        ]
      }
    },
    "/v2/message/send": {
      "post": {
        "summary": "*\nSendMessageV2 sends a byte-encoded json DIDComm message to another DID.",
        "operationId": "Messaging_SendMessageV2",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/messagingSendMessageV2Response"
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
              "$ref": "#/definitions/messagingSendMessageV2Request"
            }
          }
        ],
        "tags": [
          "Messaging"
        ]
      }
    }
  },
  "definitions": {
    "messagingDeleteGroupMessageResponse": {
      "type": "object",
      "description": "*\nRepresents a response containing the message deletion event."
    },
    "messagingDeleteMessageResponse": {
      "type": "object",
      "description": "*\nRepresents a response containing the message deletion event."
    },
    "messagingGetMessageListResponse": {
      "type": "object",
      "properties": {
        "messages": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/messagingMessage"
          }
        }
      },
      "title": "*\nRepresents a response back containing a message list"
    },
    "messagingMessage": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "recipients": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "data": {
          "type": "string"
        },
        "transport": {
          "type": "string"
        },
        "groupId": {
          "type": "string"
        },
        "events": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/messagingMessageEvent"
          }
        }
      }
    },
    "messagingMessageEvent": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "MessageId": {
          "type": "string"
        },
        "DID": {
          "type": "string"
        },
        "Type": {
          "type": "string"
        },
        "EventTime": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "messagingMessageSettings": {
      "type": "object",
      "properties": {
        "protocolPreferences": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "title": "*\nRepresents the preferences for sending messages"
    },
    "messagingSaveMessageV2Request": {
      "type": "object",
      "properties": {
        "body": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "did": {
          "type": "string"
        },
        "from": {
          "type": "string"
        },
        "replyToId": {
          "type": "string"
        },
        "recipientList": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "groupId": {
          "type": "string"
        }
      },
      "description": "*\nRepresents a message to save locally. Useful if it was sent out of band."
    },
    "messagingSaveMessageV2Response": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      },
      "title": "*\nRepresents a response back from a saved message"
    },
    "messagingSendMessageRequest": {
      "type": "object",
      "properties": {
        "msg": {
          "type": "string"
        },
        "did": {
          "type": "string"
        },
        "amount": {
          "type": "string",
          "format": "int64"
        },
        "replyToId": {
          "type": "string"
        }
      },
      "title": "*\nRepresents a message send to another DID"
    },
    "messagingSendMessageResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      },
      "title": "*\nRepresents a response back from a sent message"
    },
    "messagingSendMessageV2Request": {
      "type": "object",
      "properties": {
        "body": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "did": {
          "type": "string"
        },
        "amount": {
          "type": "string",
          "format": "int64"
        },
        "replyToId": {
          "type": "string"
        },
        "messageSettings": {
          "$ref": "#/definitions/messagingMessageSettings"
        },
        "recipientList": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "groupId": {
          "type": "string"
        }
      },
      "title": "*\nRepresents a message send to another DID"
    },
    "messagingSendMessageV2Response": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      },
      "title": "*\nRepresents a response back from a sent message"
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
