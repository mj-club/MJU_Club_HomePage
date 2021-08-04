import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="site-main-menu">
			<ul>
				<li className="has-children">
					<NavLink to={process.env.PUBLIC_URL + "/club-union"}><span className="menu-text">총동연</span></NavLink>
					<span className="menu-toggle"><i className="far fa-angle-down"></i></span>
					<ul className="sub-menu">
						<li><NavLink to={process.env.PUBLIC_URL + "/club-union"}><span className="menu-text">소개</span></NavLink></li>
						<li><NavLink to={process.env.PUBLIC_URL + "/club-union/notice"}><span className="menu-text">공지사항</span></NavLink></li>
						<li><NavLink to={process.env.PUBLIC_URL + "/home-three"}><span className="menu-text">문의사항</span></NavLink></li>
					</ul>
				</li>
				<li className="has-children">
					<NavLink to={process.env.PUBLIC_URL + "/"}><span className="menu-text">동아리</span></NavLink>
					<span className="menu-toggle"><i className="far fa-angle-down"></i></span>
					<ul className="sub-menu">
						<li><NavLink to={process.env.PUBLIC_URL + "/about"}><span className="menu-text">소개</span></NavLink></li>
						<li><NavLink to={process.env.PUBLIC_URL + "/Notice"}><span className="menu-text">공지사항</span></NavLink></li>
						<li><NavLink to={process.env.PUBLIC_URL + "/FAQs"}><span className="menu-text">FAQ</span></NavLink></li>
					</ul>
				</li>
				<li>
					<NavLink to={process.env.PUBLIC_URL + "/service"}><span className="menu-text">청원게시판</span></NavLink>
				</li>
				<li className="has-children">
					<NavLink to={process.env.PUBLIC_URL + "/work"}><span className="menu-text">키움 이모저모</span></NavLink>
					<span className="menu-toggle"><i className="far fa-angle-down"></i></span>
					<ul className="sub-menu">
							<li><NavLink to={process.env.PUBLIC_URL + "/work"}><span className="menu-text">자유게시판</span></NavLink></li>
							<li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">동아리방 지도</span></NavLink></li>
							<li><NavLink to={process.env.PUBLIC_URL + "/work"}><span className="menu-text">제휴사업 지도</span></NavLink></li>
							<li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">동아리 제출 서류 게시판</span></NavLink></li>
							<li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">시설 대관</span></NavLink></li>
					</ul>
				</li>
				<li>
					<NavLink to={process.env.PUBLIC_URL + "/blog-grid"}><span className="menu-text">Monthly Key:um</span></NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
