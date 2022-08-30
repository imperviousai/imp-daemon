# gon.hcl
#
# The path follows a pattern
# ./dist/BUILD-ID_TARGET/BINARY-NAME
source = ["dist/impervious-macos-amd64_darwin_amd64_v1/impervious"]
bundle_id = "ai.impervious.freeimp"

apple_id {
  username = "support@impervious.ai"
  password = "@env:AC_PASSWORD"
}

sign {
  application_identity = "Developer ID Application: Impervious Technologies Inc. (S722DY52YY)"
}

zip {
  output_path = "dist/impervious-macos-amd64_darwin_amd64_v1/impervious.zip"
}