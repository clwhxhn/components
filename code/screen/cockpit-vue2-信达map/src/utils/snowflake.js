import SnowflakeId from 'snowflake-id'

var snowflake = new SnowflakeId({
  mid: 42,
  offset: (2019 - 1970) * 31536000 * 1000
})

export default snowflake
