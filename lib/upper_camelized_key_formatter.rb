class UpperCamelizedKeyFormatter < JSONAPI::KeyFormatter
  class << self
    def format(key)
      super.camelize(:upper)
    end
  end
end