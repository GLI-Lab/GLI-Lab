"use client"

import Image from 'next/image'
import {useState} from "react"
import Link from "next/link"
import {Menu} from "lucide-react"
import internal from "node:stream";

export default function Header() {
  const [state, setState] = useState(false)

  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  // 메뉴 항목 정의 (서브 메뉴를 포함할 수 있도록)
  const menus = [
    {
      title: "About",
      path: "/about",
      subMenus: [
        { title: "Team", path: "/about/team" },
        { title: "Lab", path: "/about/lab" }
      ]
    },
    // ... 나머지 메뉴 항목과 서브 메뉴들을 여기에 추가
  ];

  // const menus = [
  //   {title: "About", path: "/about"},
  //   {title: "Members", path: "/menbers"},
  //   {title: "Research", path: "/research"},
  //   {title: "Publications", path: "/publications"},
  //   {title: "Lectures", path: "/lectures"},
  // ]

  return (
    <nav className="bg-white w-full border-b md:border-b-1">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-6">
        <div className="flex items-center justify-between py-3 min-w-[320px] md:py-3 md:block">

          {/* 네비게이션 로고 */}
          <Link href="/" className="items-center flex">
            <div className="h-16 w-16 md:h-20 md:w-20">
              <Image src="/GLI_spare_v2 Black Logo.png" alt="logo" width="96" height="96" layout="intrinsic" />
            </div>
            <div className="-space-y-1 ml-3 text-xl md:text-2xl py-1">
              <p>Graph & Language</p>
              <p>Intelligence Lab.</p>
            </div>
          </Link>

          {/* 네비게이션 햄버거 아이콘 */}
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu/>
            </button>
          </div>
        </div>

        {/* 네비게이션 메뉴 */}
        {/*<div className={`flex-1 justify-self-center pb-3 mt-2 md:block md:pb-0 md:mt-0 ${*/}
        {/*  state ? "animate-fadeIn" : "hidden"}`}>*/}
        {/*  <ul className="justify-end items-center space-y-6 md:flex md:space-x-4 md:space-y-0 lg:space-x-10">*/}
        {/*    {menus.map((item, idx) => (*/}
        {/*      <li key={idx} className="text-gray-600 hover:text-green-800 hover:font-bold">*/}
        {/*        <Link href={item.path}>{item.title}</Link>*/}
        {/*      </li>*/}
        {/*    ))}*/}
        {/*  </ul>*/}
        {/*</div>*/}

        {/* 네비게이션 메뉴 */}
        <div className={`flex-1 justify-self-center pb-3 mt-2 md:flex md:pb-0 md:mt-0 ${activeMenu ? "block" : "hidden"}`}>
          <ul className="md:flex md:space-x-4 lg:space-x-10">
            {menus.map((item, idx) => (
              <li key={idx} className="relative text-gray-600 hover:text-green-800">
                <button
                  onMouseEnter={() => setActiveMenu(idx)} // 호버 시 서브 메뉴 활성화
                  onMouseLeave={() => setActiveMenu(null)} // 호버 해제 시 서브 메뉴 비활성화
                  onClick={() => setActiveMenu(activeMenu === idx ? null : idx)} // 클릭 시 토글
                  className="hover:font-bold"
                >
                  {item.title}
                </button>
                {/* 서브 메뉴 */}
                {activeMenu === idx && item.subMenus && (
                  <ul
                    className="absolute left-0 w-full mt-2 bg-white shadow-md z-10 md:w-auto"
                    onMouseEnter={() => setActiveMenu(idx)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    {item.subMenus.map((subItem, subIdx) => (
                      <li key={subIdx} className="whitespace-nowrap px-4 py-2 hover:bg-gray-100">
                        <Link href={subItem.path}>
                          <a>{subItem.title}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>


      </div>



    </nav>
  )
}