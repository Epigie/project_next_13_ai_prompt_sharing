import { generateRandomIntegerInRange } from "@utils";

export const hospitalsData = [
  {
    id: "1",
    name: "Hospital One",
    city: "New York, USA.",
    emails: ["one@hospital.com", "two@hospital.com", "three@hospital.com"],
    phone_numbers: ["077-000-7858", "077-000-7859", "077-000-7857"],
    specialisations: [
      "heart",
      "brain",
      "eye",
      "tooth",
      "heart",
      "brain",
      "eye",
      "tooth",
    ],
    picture:
      "https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
  },
  {
    id: "2",
    name: "Hospital Two",
    city: "New York, USA.",
    emails: ["one@test.com", "two@test.com", "three@test.com"],
    phone_numbers: ["096-848-8171"],
    specialisations: ["tooth"],
    picture:
      "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg",
  },
  {
    id: "3",
    name: "Hospital Three",
    city: "New York, USA.",
    emails: ["four@test.com", "five@test.com", "six@test.com"],
    phone_numbers: ["097-848-8171"],
    specialisations: ["heart"],
    picture:
      "https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg",
  },
  {
    id: "4",
    name: "Hospital Four",
    city: "New York, USA.",
    emails: ["one@hospital.com", "two@hospital.com", "three@hospital.com"],
    phone_numbers: ["077-000-7858", "077-000-7859", "077-000-7857"],
    specialisations: ["heart", "brain", "eye", "tooth"],
    picture:
      "https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg",
  },
  {
    id: "5",
    name: "Hospital Five",
    city: "New York, USA.",
    emails: ["one@test.com", "two@test.com", "three@test.com"],
    phone_numbers: ["096-844-8171"],
    specialisations: ["eye"],
    picture:
      "https://66.media.tumblr.com/f19901f50b79604839ca761cd6d74748/tumblr_o65rohhkQL1qho82wo1_1280.jpg",
  },
  {
    id: "6",
    name: "Hospital Six",
    city: "New York, USA.",
    emails: ["seven@test.com", "eight@test.com", "nine@test.com"],
    phone_numbers: ["097-858-8171"],
    specialisations: ["nose"],
    picture:
      "https://picsum.photos/" +
      generateRandomIntegerInRange(800, 2000) +
      "/" +
      generateRandomIntegerInRange(800, 2000) +
      "",
  },
  {
    id: "7",
    name: "Hospital Seven",
    city: "New York, USA.",
    emails: ["one@hospital.com", "two@hospital.com", "three@hospital.com"],
    phone_numbers: ["077-000-7858", "077-000-7859", "077-000-7857"],
    specialisations: ["heart", "brain", "eye", "tooth"],
    picture:
      "https://picsum.photos/" +
      generateRandomIntegerInRange(800, 2000) +
      "/" +
      generateRandomIntegerInRange(800, 2000) +
      "",
  },
  {
    id: "8",
    name: "Hospital Eight",
    city: "New York, USA.",
    emails: ["eight@test.com"],
    phone_numbers: ["096-888-8171"],
    specialisations: ["tooth"],
    picture:
      "https://picsum.photos/" +
      generateRandomIntegerInRange(800, 2000) +
      "/" +
      generateRandomIntegerInRange(800, 2000) +
      "",
  },
  {
    id: "9",
    name: "Hospital Nine",
    city: "New York, USA.",
    emails: ["nine@test.com"],
    phone_numbers: ["097-999-8171"],
    specialisations: ["heart"],
    picture:
      "https://picsum.photos/" +
      generateRandomIntegerInRange(800, 2000) +
      "/" +
      generateRandomIntegerInRange(800, 2000) +
      "",
  },
  {
    id: "10",
    name: "Hospital Ten",
    city: "New York, USA.",
    emails: ["ten@hospital.com"],
    phone_numbers: ["1010-000-7858"],
    specialisations: ["heart", "tooth"],
    picture:
      "https://picsum.photos/" +
      generateRandomIntegerInRange(800, 2000) +
      "/" +
      generateRandomIntegerInRange(800, 2000) +
      "",
  },
  {
    id: "11",
    name: "Hospital Eleven",
    city: "New York, USA.",
    emails: ["eleven@test.com"],
    phone_numbers: ["1111-844-8171"],
    specialisations: ["eye"],
    picture:
      "https://picsum.photos/" +
      generateRandomIntegerInRange(800, 2000) +
      "/" +
      generateRandomIntegerInRange(800, 2000) +
      "",
  },
  {
    id: "12",
    name: "Hospital Twelve",
    city: "New York, USA.",
    emails: ["twel@test.com"],
    phone_numbers: ["097-858-8171"],
    specialisations: ["nose"],
    picture:
      "https://picsum.photos/" +
      generateRandomIntegerInRange(800, 2000) +
      "/" +
      generateRandomIntegerInRange(800, 2000) +
      "",
  },
];
