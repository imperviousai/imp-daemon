// This file is generated by rust-protobuf 3.1.0. Do not edit
// .proto file is parsed by protoc --rust-out=...
// @generated

// https://github.com/rust-lang/rust-clippy/issues/702
#![allow(unknown_lints)]
#![allow(clippy::all)]

#![allow(unused_attributes)]
#![cfg_attr(rustfmt, rustfmt::skip)]

#![allow(box_pointers)]
#![allow(dead_code)]
#![allow(missing_docs)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(trivial_casts)]
#![allow(unused_results)]
#![allow(unused_mut)]

//! Generated file from `proto/imp/api/relay/relay.proto`

/// Generated files are compatible only with the same version
/// of protobuf runtime.
const _PROTOBUF_VERSION_CHECK: () = ::protobuf::VERSION_3_1_0;

#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:relay.ServiceEndpoint)
pub struct ServiceEndpoint {
    // message fields
    // @@protoc_insertion_point(field:relay.ServiceEndpoint.id)
    pub id: ::std::string::String,
    // @@protoc_insertion_point(field:relay.ServiceEndpoint.type)
    pub type_: ::std::string::String,
    // @@protoc_insertion_point(field:relay.ServiceEndpoint.serviceEndpoint)
    pub serviceEndpoint: ::std::string::String,
    // special fields
    // @@protoc_insertion_point(special_field:relay.ServiceEndpoint.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a ServiceEndpoint {
    fn default() -> &'a ServiceEndpoint {
        <ServiceEndpoint as ::protobuf::Message>::default_instance()
    }
}

impl ServiceEndpoint {
    pub fn new() -> ServiceEndpoint {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(3);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "id",
            |m: &ServiceEndpoint| { &m.id },
            |m: &mut ServiceEndpoint| { &mut m.id },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "type",
            |m: &ServiceEndpoint| { &m.type_ },
            |m: &mut ServiceEndpoint| { &mut m.type_ },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "serviceEndpoint",
            |m: &ServiceEndpoint| { &m.serviceEndpoint },
            |m: &mut ServiceEndpoint| { &mut m.serviceEndpoint },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<ServiceEndpoint>(
            "ServiceEndpoint",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for ServiceEndpoint {
    const NAME: &'static str = "ServiceEndpoint";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.id = is.read_string()?;
                },
                18 => {
                    self.type_ = is.read_string()?;
                },
                26 => {
                    self.serviceEndpoint = is.read_string()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if !self.id.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.id);
        }
        if !self.type_.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.type_);
        }
        if !self.serviceEndpoint.is_empty() {
            my_size += ::protobuf::rt::string_size(3, &self.serviceEndpoint);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if !self.id.is_empty() {
            os.write_string(1, &self.id)?;
        }
        if !self.type_.is_empty() {
            os.write_string(2, &self.type_)?;
        }
        if !self.serviceEndpoint.is_empty() {
            os.write_string(3, &self.serviceEndpoint)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> ServiceEndpoint {
        ServiceEndpoint::new()
    }

    fn clear(&mut self) {
        self.id.clear();
        self.type_.clear();
        self.serviceEndpoint.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static ServiceEndpoint {
        static instance: ServiceEndpoint = ServiceEndpoint {
            id: ::std::string::String::new(),
            type_: ::std::string::String::new(),
            serviceEndpoint: ::std::string::String::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for ServiceEndpoint {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("ServiceEndpoint").unwrap()).clone()
    }
}

impl ::std::fmt::Display for ServiceEndpoint {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for ServiceEndpoint {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

/// *
///  Represents a request to a relay node to delegate them as a relay
#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:relay.RequestRelayRequest)
pub struct RequestRelayRequest {
    // message fields
    // @@protoc_insertion_point(field:relay.RequestRelayRequest.toDID)
    pub toDID: ::std::string::String,
    // @@protoc_insertion_point(field:relay.RequestRelayRequest.amount)
    pub amount: i64,
    // @@protoc_insertion_point(field:relay.RequestRelayRequest.privateServiceEndpoints)
    pub privateServiceEndpoints: ::std::vec::Vec<ServiceEndpoint>,
    // special fields
    // @@protoc_insertion_point(special_field:relay.RequestRelayRequest.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a RequestRelayRequest {
    fn default() -> &'a RequestRelayRequest {
        <RequestRelayRequest as ::protobuf::Message>::default_instance()
    }
}

impl RequestRelayRequest {
    pub fn new() -> RequestRelayRequest {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(3);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "toDID",
            |m: &RequestRelayRequest| { &m.toDID },
            |m: &mut RequestRelayRequest| { &mut m.toDID },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "amount",
            |m: &RequestRelayRequest| { &m.amount },
            |m: &mut RequestRelayRequest| { &mut m.amount },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_vec_simpler_accessor::<_, _>(
            "privateServiceEndpoints",
            |m: &RequestRelayRequest| { &m.privateServiceEndpoints },
            |m: &mut RequestRelayRequest| { &mut m.privateServiceEndpoints },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<RequestRelayRequest>(
            "RequestRelayRequest",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for RequestRelayRequest {
    const NAME: &'static str = "RequestRelayRequest";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.toDID = is.read_string()?;
                },
                16 => {
                    self.amount = is.read_int64()?;
                },
                26 => {
                    self.privateServiceEndpoints.push(is.read_message()?);
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if !self.toDID.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.toDID);
        }
        if self.amount != 0 {
            my_size += ::protobuf::rt::int64_size(2, self.amount);
        }
        for value in &self.privateServiceEndpoints {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint64_size(len) + len;
        };
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if !self.toDID.is_empty() {
            os.write_string(1, &self.toDID)?;
        }
        if self.amount != 0 {
            os.write_int64(2, self.amount)?;
        }
        for v in &self.privateServiceEndpoints {
            ::protobuf::rt::write_message_field_with_cached_size(3, v, os)?;
        };
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> RequestRelayRequest {
        RequestRelayRequest::new()
    }

    fn clear(&mut self) {
        self.toDID.clear();
        self.amount = 0;
        self.privateServiceEndpoints.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static RequestRelayRequest {
        static instance: RequestRelayRequest = RequestRelayRequest {
            toDID: ::std::string::String::new(),
            amount: 0,
            privateServiceEndpoints: ::std::vec::Vec::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for RequestRelayRequest {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("RequestRelayRequest").unwrap()).clone()
    }
}

impl ::std::fmt::Display for RequestRelayRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RequestRelayRequest {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

/// *
///  Represents a response back from a relay request
#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:relay.RequestRelayResponse)
pub struct RequestRelayResponse {
    // message fields
    // @@protoc_insertion_point(field:relay.RequestRelayResponse.id)
    pub id: ::std::string::String,
    // special fields
    // @@protoc_insertion_point(special_field:relay.RequestRelayResponse.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a RequestRelayResponse {
    fn default() -> &'a RequestRelayResponse {
        <RequestRelayResponse as ::protobuf::Message>::default_instance()
    }
}

impl RequestRelayResponse {
    pub fn new() -> RequestRelayResponse {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(1);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "id",
            |m: &RequestRelayResponse| { &m.id },
            |m: &mut RequestRelayResponse| { &mut m.id },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<RequestRelayResponse>(
            "RequestRelayResponse",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for RequestRelayResponse {
    const NAME: &'static str = "RequestRelayResponse";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.id = is.read_string()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if !self.id.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.id);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if !self.id.is_empty() {
            os.write_string(1, &self.id)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> RequestRelayResponse {
        RequestRelayResponse::new()
    }

    fn clear(&mut self) {
        self.id.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static RequestRelayResponse {
        static instance: RequestRelayResponse = RequestRelayResponse {
            id: ::std::string::String::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for RequestRelayResponse {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("RequestRelayResponse").unwrap()).clone()
    }
}

impl ::std::fmt::Display for RequestRelayResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RequestRelayResponse {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

/// *
///  Represents a request to a relay node to send over mailbox messages
#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:relay.RequestMailboxRequest)
pub struct RequestMailboxRequest {
    // message fields
    // @@protoc_insertion_point(field:relay.RequestMailboxRequest.toDID)
    pub toDID: ::std::string::String,
    // @@protoc_insertion_point(field:relay.RequestMailboxRequest.amount)
    pub amount: i64,
    // @@protoc_insertion_point(field:relay.RequestMailboxRequest.privateServiceEndpoints)
    pub privateServiceEndpoints: ::std::vec::Vec<ServiceEndpoint>,
    // special fields
    // @@protoc_insertion_point(special_field:relay.RequestMailboxRequest.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a RequestMailboxRequest {
    fn default() -> &'a RequestMailboxRequest {
        <RequestMailboxRequest as ::protobuf::Message>::default_instance()
    }
}

impl RequestMailboxRequest {
    pub fn new() -> RequestMailboxRequest {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(3);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "toDID",
            |m: &RequestMailboxRequest| { &m.toDID },
            |m: &mut RequestMailboxRequest| { &mut m.toDID },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "amount",
            |m: &RequestMailboxRequest| { &m.amount },
            |m: &mut RequestMailboxRequest| { &mut m.amount },
        ));
        fields.push(::protobuf::reflect::rt::v2::make_vec_simpler_accessor::<_, _>(
            "privateServiceEndpoints",
            |m: &RequestMailboxRequest| { &m.privateServiceEndpoints },
            |m: &mut RequestMailboxRequest| { &mut m.privateServiceEndpoints },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<RequestMailboxRequest>(
            "RequestMailboxRequest",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for RequestMailboxRequest {
    const NAME: &'static str = "RequestMailboxRequest";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.toDID = is.read_string()?;
                },
                16 => {
                    self.amount = is.read_int64()?;
                },
                26 => {
                    self.privateServiceEndpoints.push(is.read_message()?);
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if !self.toDID.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.toDID);
        }
        if self.amount != 0 {
            my_size += ::protobuf::rt::int64_size(2, self.amount);
        }
        for value in &self.privateServiceEndpoints {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint64_size(len) + len;
        };
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if !self.toDID.is_empty() {
            os.write_string(1, &self.toDID)?;
        }
        if self.amount != 0 {
            os.write_int64(2, self.amount)?;
        }
        for v in &self.privateServiceEndpoints {
            ::protobuf::rt::write_message_field_with_cached_size(3, v, os)?;
        };
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> RequestMailboxRequest {
        RequestMailboxRequest::new()
    }

    fn clear(&mut self) {
        self.toDID.clear();
        self.amount = 0;
        self.privateServiceEndpoints.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static RequestMailboxRequest {
        static instance: RequestMailboxRequest = RequestMailboxRequest {
            toDID: ::std::string::String::new(),
            amount: 0,
            privateServiceEndpoints: ::std::vec::Vec::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for RequestMailboxRequest {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("RequestMailboxRequest").unwrap()).clone()
    }
}

impl ::std::fmt::Display for RequestMailboxRequest {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RequestMailboxRequest {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

/// *
///  Represents a response back from a relay request
#[derive(PartialEq,Clone,Default,Debug)]
// @@protoc_insertion_point(message:relay.RequestMailboxResponse)
pub struct RequestMailboxResponse {
    // message fields
    // @@protoc_insertion_point(field:relay.RequestMailboxResponse.id)
    pub id: ::std::string::String,
    // special fields
    // @@protoc_insertion_point(special_field:relay.RequestMailboxResponse.special_fields)
    pub special_fields: ::protobuf::SpecialFields,
}

impl<'a> ::std::default::Default for &'a RequestMailboxResponse {
    fn default() -> &'a RequestMailboxResponse {
        <RequestMailboxResponse as ::protobuf::Message>::default_instance()
    }
}

impl RequestMailboxResponse {
    pub fn new() -> RequestMailboxResponse {
        ::std::default::Default::default()
    }

    fn generated_message_descriptor_data() -> ::protobuf::reflect::GeneratedMessageDescriptorData {
        let mut fields = ::std::vec::Vec::with_capacity(1);
        let mut oneofs = ::std::vec::Vec::with_capacity(0);
        fields.push(::protobuf::reflect::rt::v2::make_simpler_field_accessor::<_, _>(
            "id",
            |m: &RequestMailboxResponse| { &m.id },
            |m: &mut RequestMailboxResponse| { &mut m.id },
        ));
        ::protobuf::reflect::GeneratedMessageDescriptorData::new_2::<RequestMailboxResponse>(
            "RequestMailboxResponse",
            fields,
            oneofs,
        )
    }
}

impl ::protobuf::Message for RequestMailboxResponse {
    const NAME: &'static str = "RequestMailboxResponse";

    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::Result<()> {
        while let Some(tag) = is.read_raw_tag_or_eof()? {
            match tag {
                10 => {
                    self.id = is.read_string()?;
                },
                tag => {
                    ::protobuf::rt::read_unknown_or_skip_group(tag, is, self.special_fields.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u64 {
        let mut my_size = 0;
        if !self.id.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.id);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.special_fields.unknown_fields());
        self.special_fields.cached_size().set(my_size as u32);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::Result<()> {
        if !self.id.is_empty() {
            os.write_string(1, &self.id)?;
        }
        os.write_unknown_fields(self.special_fields.unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn special_fields(&self) -> &::protobuf::SpecialFields {
        &self.special_fields
    }

    fn mut_special_fields(&mut self) -> &mut ::protobuf::SpecialFields {
        &mut self.special_fields
    }

    fn new() -> RequestMailboxResponse {
        RequestMailboxResponse::new()
    }

    fn clear(&mut self) {
        self.id.clear();
        self.special_fields.clear();
    }

    fn default_instance() -> &'static RequestMailboxResponse {
        static instance: RequestMailboxResponse = RequestMailboxResponse {
            id: ::std::string::String::new(),
            special_fields: ::protobuf::SpecialFields::new(),
        };
        &instance
    }
}

impl ::protobuf::MessageFull for RequestMailboxResponse {
    fn descriptor() -> ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::Lazy::new();
        descriptor.get(|| file_descriptor().message_by_package_relative_name("RequestMailboxResponse").unwrap()).clone()
    }
}

impl ::std::fmt::Display for RequestMailboxResponse {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RequestMailboxResponse {
    type RuntimeType = ::protobuf::reflect::rt::RuntimeTypeMessage<Self>;
}

static file_descriptor_proto_data: &'static [u8] = b"\
    \n\x1fproto/imp/api/relay/relay.proto\x12\x05relay\x1a\x1cgoogle/api/ann\
    otations.proto\x1a.protoc-gen-openapiv2/options/annotations.proto\"_\n\
    \x0fServiceEndpoint\x12\x0e\n\x02id\x18\x01\x20\x01(\tR\x02id\x12\x12\n\
    \x04type\x18\x02\x20\x01(\tR\x04type\x12(\n\x0fserviceEndpoint\x18\x03\
    \x20\x01(\tR\x0fserviceEndpoint\"\x95\x01\n\x13RequestRelayRequest\x12\
    \x14\n\x05toDID\x18\x01\x20\x01(\tR\x05toDID\x12\x16\n\x06amount\x18\x02\
    \x20\x01(\x03R\x06amount\x12P\n\x17privateServiceEndpoints\x18\x03\x20\
    \x03(\x0b2\x16.relay.ServiceEndpointR\x17privateServiceEndpoints\"&\n\
    \x14RequestRelayResponse\x12\x0e\n\x02id\x18\x01\x20\x01(\tR\x02id\"\x97\
    \x01\n\x15RequestMailboxRequest\x12\x14\n\x05toDID\x18\x01\x20\x01(\tR\
    \x05toDID\x12\x16\n\x06amount\x18\x02\x20\x01(\x03R\x06amount\x12P\n\x17\
    privateServiceEndpoints\x18\x03\x20\x03(\x0b2\x16.relay.ServiceEndpointR\
    \x17privateServiceEndpoints\"(\n\x16RequestMailboxResponse\x12\x0e\n\x02\
    id\x18\x01\x20\x01(\tR\x02id2\xdb\x01\n\x05Relay\x12e\n\x0cRequestRelay\
    \x12\x1a.relay.RequestRelayRequest\x1a\x1b.relay.RequestRelayResponse\"\
    \x1c\x82\xd3\xe4\x93\x02\x16\"\x11/v1/relay/request:\x01*\x12k\n\x0eRequ\
    estMailbox\x12\x1c.relay.RequestMailboxRequest\x1a\x1d.relay.RequestMail\
    boxResponse\"\x1c\x82\xd3\xe4\x93\x02\x16\"\x11/v1/relay/mailbox:\x01*B\
    \xba\x02Z&github.com/imperviousai/imp-daemon/gen\x92A\x8e\x02\x12=\n\x0e\
    Relay\x20Services\"&\n\rImpervious\x20AI\x12\x15https://impervious.ai2\
    \x031.0*\x03\x01\x02\x042\x10application/json:\x10application/jsonZa\n_\
    \n\x07api_key\x12T\x08\x02\x125An\x20API\x20key\x20generated\x20by\x20th\
    e\x20daemon\x20for\x20authentication\x1a\x17Grpc-Metadata-X-API-KEY\x20\
    \x03b\r\n\x0b\n\x07api_key\x12\0r2\n\x14Documentation\x20on\x20IMP\x12\
    \x1ahttps://docs.impervious.aiJ\xec\x0f\n\x06\x12\x04\x01\0l\x01\n7\n\
    \x01\x0c\x12\x03\x01\0\x12\x1a-/\x20Allows\x20for\x20interacting\x20with\
    \x20relay\x20services\n\n\x08\n\x01\x02\x12\x03\x03\0\x0e\n\x08\n\x01\
    \x08\x12\x03\x05\0=\n\t\n\x02\x08\x0b\x12\x03\x05\0=\n\t\n\x02\x03\0\x12\
    \x03\x07\0&\n\t\n\x02\x03\x01\x12\x03\x08\08\n\t\n\x01\x08\x12\x04\n\0,\
    \x02\n\x0b\n\x03\x08\x92\x08\x12\x04\n\0,\x02\nI\n\x02\x06\0\x12\x042\0F\
    \x01\x1a=*\n\x20Relay\x20service\x20allows\x20for\x20interacting\x20with\
    \x20relay\x20services.\n\n\n\n\x03\x06\0\x01\x12\x032\x08\r\nC\n\x04\x06\
    \0\x02\0\x12\x046\x08;\t\x1a5*\n\x20RequestRelay\x20requests\x20a\x20rel\
    ay\x20to\x20a\x20specific\x20node.\n\n\x0c\n\x05\x06\0\x02\0\x01\x12\x03\
    6\x0c\x18\n\x0c\n\x05\x06\0\x02\0\x02\x12\x036\x19,\n\x0c\n\x05\x06\0\
    \x02\0\x03\x12\x0367K\n\r\n\x05\x06\0\x02\0\x04\x12\x047\x10:\x12\n\x11\
    \n\t\x06\0\x02\0\x04\xb0\xca\xbc\"\x12\x047\x10:\x12\nW\n\x04\x06\0\x02\
    \x01\x12\x04@\x08E\t\x1aI*\n\x20RequestMailbox\x20requests\x20a\x20relay\
    \x20to\x20send\x20over\x20stored\x20mailbox\x20messages.\n\n\x0c\n\x05\
    \x06\0\x02\x01\x01\x12\x03@\x0c\x1a\n\x0c\n\x05\x06\0\x02\x01\x02\x12\
    \x03@\x1b0\n\x0c\n\x05\x06\0\x02\x01\x03\x12\x03@;Q\n\r\n\x05\x06\0\x02\
    \x01\x04\x12\x04A\x10D\x12\n\x11\n\t\x06\0\x02\x01\x04\xb0\xca\xbc\"\x12\
    \x04A\x10D\x12\n\n\n\x02\x04\0\x12\x04H\0L\x01\n\n\n\x03\x04\0\x01\x12\
    \x03H\x08\x17\n-\n\x04\x04\0\x02\0\x12\x03I\x08\x16\"\x20\x20The\x20ID\
    \x20of\x20the\x20service\x20endpoint\n\n\x0c\n\x05\x04\0\x02\0\x05\x12\
    \x03I\x08\x0e\n\x0c\n\x05\x04\0\x02\0\x01\x12\x03I\x0f\x11\n\x0c\n\x05\
    \x04\0\x02\0\x03\x12\x03I\x14\x15\n/\n\x04\x04\0\x02\x01\x12\x03J\x08\
    \x18\"\"\x20The\x20type\x20of\x20the\x20service\x20endpoint\n\n\x0c\n\
    \x05\x04\0\x02\x01\x05\x12\x03J\x08\x0e\n\x0c\n\x05\x04\0\x02\x01\x01\
    \x12\x03J\x0f\x13\n\x0c\n\x05\x04\0\x02\x01\x03\x12\x03J\x16\x17\n'\n\
    \x04\x04\0\x02\x02\x12\x03K\x08#\"\x1a\x20The\x20service\x20endpoint\x20\
    URI\n\n\x0c\n\x05\x04\0\x02\x02\x05\x12\x03K\x08\x0e\n\x0c\n\x05\x04\0\
    \x02\x02\x01\x12\x03K\x0f\x1e\n\x0c\n\x05\x04\0\x02\x02\x03\x12\x03K!\"\
    \nP\n\x02\x04\x01\x12\x04Q\0U\x01\x1aD*\n\x20Represents\x20a\x20request\
    \x20to\x20a\x20relay\x20node\x20to\x20delegate\x20them\x20as\x20a\x20rel\
    ay\n\n\n\n\x03\x04\x01\x01\x12\x03Q\x08\x1b\n8\n\x04\x04\x01\x02\0\x12\
    \x03R\x08\x19\"+\x20The\x20DID\x20you\x20want\x20to\x20request\x20to\x20\
    be\x20a\x20relay\n\n\x0c\n\x05\x04\x01\x02\0\x05\x12\x03R\x08\x0e\n\x0c\
    \n\x05\x04\x01\x02\0\x01\x12\x03R\x0f\x14\n\x0c\n\x05\x04\x01\x02\0\x03\
    \x12\x03R\x17\x18\n=\n\x04\x04\x01\x02\x01\x12\x03S\x08\x19\"0\x20The\
    \x20amount\x20of\x20satoshis\x20to\x20send\x20for\x20the\x20request\n\n\
    \x0c\n\x05\x04\x01\x02\x01\x05\x12\x03S\x08\r\n\x0c\n\x05\x04\x01\x02\
    \x01\x01\x12\x03S\x0e\x14\n\x0c\n\x05\x04\x01\x02\x01\x03\x12\x03S\x17\
    \x18\nX\n\x04\x04\x01\x02\x02\x12\x03T\x08=\"K\x20The\x20private\x20serv\
    ice\x20endpoints\x20to\x20request\x20the\x20relay\x20to\x20forward\x20me\
    ssages\x20to\n\n\x0c\n\x05\x04\x01\x02\x02\x04\x12\x03T\x08\x10\n\x0c\n\
    \x05\x04\x01\x02\x02\x06\x12\x03T\x11\x20\n\x0c\n\x05\x04\x01\x02\x02\
    \x01\x12\x03T!8\n\x0c\n\x05\x04\x01\x02\x02\x03\x12\x03T;<\n?\n\x02\x04\
    \x02\x12\x04Z\0\\\x01\x1a3*\n\x20Represents\x20a\x20response\x20back\x20\
    from\x20a\x20relay\x20request\n\n\n\n\x03\x04\x02\x01\x12\x03Z\x08\x1c\n\
    \"\n\x04\x04\x02\x02\0\x12\x03[\x08\x16\"\x15\x20returned\x20message\x20\
    ID\n\n\x0c\n\x05\x04\x02\x02\0\x05\x12\x03[\x08\x0e\n\x0c\n\x05\x04\x02\
    \x02\0\x01\x12\x03[\x0f\x11\n\x0c\n\x05\x04\x02\x02\0\x03\x12\x03[\x14\
    \x15\nR\n\x02\x04\x03\x12\x04a\0e\x01\x1aF*\n\x20Represents\x20a\x20requ\
    est\x20to\x20a\x20relay\x20node\x20to\x20send\x20over\x20mailbox\x20mess\
    ages\n\n\n\n\x03\x04\x03\x01\x12\x03a\x08\x1d\n8\n\x04\x04\x03\x02\0\x12\
    \x03b\x08\x19\"+\x20The\x20DID\x20you\x20want\x20to\x20request\x20to\x20\
    be\x20a\x20relay\n\n\x0c\n\x05\x04\x03\x02\0\x05\x12\x03b\x08\x0e\n\x0c\
    \n\x05\x04\x03\x02\0\x01\x12\x03b\x0f\x14\n\x0c\n\x05\x04\x03\x02\0\x03\
    \x12\x03b\x17\x18\n=\n\x04\x04\x03\x02\x01\x12\x03c\x08\x19\"0\x20The\
    \x20amount\x20of\x20satoshis\x20to\x20send\x20for\x20the\x20request\n\n\
    \x0c\n\x05\x04\x03\x02\x01\x05\x12\x03c\x08\r\n\x0c\n\x05\x04\x03\x02\
    \x01\x01\x12\x03c\x0e\x14\n\x0c\n\x05\x04\x03\x02\x01\x03\x12\x03c\x17\
    \x18\nX\n\x04\x04\x03\x02\x02\x12\x03d\x08=\"K\x20The\x20private\x20serv\
    ice\x20endpoints\x20to\x20request\x20the\x20relay\x20to\x20forward\x20me\
    ssages\x20to\n\n\x0c\n\x05\x04\x03\x02\x02\x04\x12\x03d\x08\x10\n\x0c\n\
    \x05\x04\x03\x02\x02\x06\x12\x03d\x11\x20\n\x0c\n\x05\x04\x03\x02\x02\
    \x01\x12\x03d!8\n\x0c\n\x05\x04\x03\x02\x02\x03\x12\x03d;<\n?\n\x02\x04\
    \x04\x12\x04j\0l\x01\x1a3*\n\x20Represents\x20a\x20response\x20back\x20f\
    rom\x20a\x20relay\x20request\n\n\n\n\x03\x04\x04\x01\x12\x03j\x08\x1e\n\
    \"\n\x04\x04\x04\x02\0\x12\x03k\x08\x16\"\x15\x20returned\x20message\x20\
    ID\n\n\x0c\n\x05\x04\x04\x02\0\x05\x12\x03k\x08\x0e\n\x0c\n\x05\x04\x04\
    \x02\0\x01\x12\x03k\x0f\x11\n\x0c\n\x05\x04\x04\x02\0\x03\x12\x03k\x14\
    \x15b\x06proto3\
";

/// `FileDescriptorProto` object which was a source for this generated file
fn file_descriptor_proto() -> &'static ::protobuf::descriptor::FileDescriptorProto {
    static file_descriptor_proto_lazy: ::protobuf::rt::Lazy<::protobuf::descriptor::FileDescriptorProto> = ::protobuf::rt::Lazy::new();
    file_descriptor_proto_lazy.get(|| {
        ::protobuf::Message::parse_from_bytes(file_descriptor_proto_data).unwrap()
    })
}

/// `FileDescriptor` object which allows dynamic access to files
pub fn file_descriptor() -> &'static ::protobuf::reflect::FileDescriptor {
    static generated_file_descriptor_lazy: ::protobuf::rt::Lazy<::protobuf::reflect::GeneratedFileDescriptor> = ::protobuf::rt::Lazy::new();
    static file_descriptor: ::protobuf::rt::Lazy<::protobuf::reflect::FileDescriptor> = ::protobuf::rt::Lazy::new();
    file_descriptor.get(|| {
        let generated_file_descriptor = generated_file_descriptor_lazy.get(|| {
            let mut deps = ::std::vec::Vec::with_capacity(2);
            deps.push(super::annotations::file_descriptor().clone());
            deps.push(super::annotations::file_descriptor().clone());
            let mut messages = ::std::vec::Vec::with_capacity(5);
            messages.push(ServiceEndpoint::generated_message_descriptor_data());
            messages.push(RequestRelayRequest::generated_message_descriptor_data());
            messages.push(RequestRelayResponse::generated_message_descriptor_data());
            messages.push(RequestMailboxRequest::generated_message_descriptor_data());
            messages.push(RequestMailboxResponse::generated_message_descriptor_data());
            let mut enums = ::std::vec::Vec::with_capacity(0);
            ::protobuf::reflect::GeneratedFileDescriptor::new_generated(
                file_descriptor_proto(),
                deps,
                messages,
                enums,
            )
        });
        ::protobuf::reflect::FileDescriptor::new_generated_2(generated_file_descriptor)
    })
}
