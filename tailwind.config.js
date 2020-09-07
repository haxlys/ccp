module.exports = {
  purge: [],
  theme: {
    // 기본값을 모두 대체하므로 일부부만 작성해서는 안됨
    // 만약 부분적으로만 대체하고 싶다면 extend에서 정의할것
    // fontSize: { "2xl": "2rem" } 하면 xl lg 등 나머지 기본 속성들은 모두 제거됨
    extend: {
      fontSize: {
        "2xl": "2rem",
      },
    },
  },
  variants: {},
  plugins: [],
}
