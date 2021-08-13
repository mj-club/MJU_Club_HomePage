"use strict";
const bcrypt = require("bcrypt");

//난수 생성
function generateRandomCode(n) {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

const clubs = [
  {
    name: "ptpi",
    code: "ptpi",
  },
  {
    name: "명지서법",
    code: "audwltjqjq",
  },
  {
    name: "ptpi",
    code: "ptpi",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // 비번 설정 어떻게 할까...
    // 비밀번호 난수 생성 -> 비밀번호 EX> clubName + 난수 4자리 -> DB로 확인 불가 -> 비밀번호 직접 설정? -> 코드상에 노출 불가 -> 비밀번호 재설정? -> 유효한 메일이 아님
    // 직접 회원가입하고 총동연 계정으로 권한 레벨 올리기 -> 프론트 UI 추가 필요, 관리자 계정을 갖고 있는 사람은 사용자 계정을 추가로 가질 수 없어, 세습이 안 됨
    // 비밀번호 난수 생성 & hash 암호화X -> 로그인시 암호화 처리 필수
    // 비밀번호 구현 조건:
    // 1. 난수 생성
    // 2. 코드상 노출 X
    // 3. 우리가 확인 가능해야 함
    // DB테이블 하나 더 만들어서 암호화 되지 않은 비번을 추가로 저장
    // let datas = [];
    // for (let i = 0; i < 41; i++) {
    //   let obj = {
    //     email: code + "@mjuclub.com",
    //     name: name,
    //     password: code + generateRandomCode(4),
    //     auth_lv: 1,
    //     ph_number: "01012345678",
    //     createdAt: new Date()
    //       .toISOString()
    //       .replace(/T/, " ")
    //       .replace(/\..+/, ""),
    //     updatedAt: new Date()
    //       .toISOString()
    //       .replace(/T/, " ")
    //       .replace(/\..+/, ""),
    //   };
    //   datas.push(obj);
    // }
    // return queryInterface.bulkInsert("users", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("users", null, {});
  },
};
