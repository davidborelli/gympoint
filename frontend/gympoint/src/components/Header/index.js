import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import * as S from './styles';
import { menus } from './menus';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [menusList] = useState(menus);
  const [menuActive, setMenuActive] = useState({ active: 'ALUNOS' });

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <>
      <S.Container>
        <S.Content>
          <nav>
            <img src={logo} alt="Logo GymPOINT" />
            {menusList.map(menu => (
              <S.LinkMenu
                key={menu.name}
                to={menu.to}
                active={menuActive.active === menu.name ? 'true' : 'false'}
                onClick={() => setMenuActive({ active: menu.name })}
              >
                {menu.name}
              </S.LinkMenu>
            ))}
          </nav>

          <aside>
            <S.Profile>
              <div>
                <strong>{profile.name}</strong>
                <button type="button" onClick={handleLogout}>
                  sair do sistema
                </button>
              </div>
            </S.Profile>
          </aside>
        </S.Content>
      </S.Container>
    </>
  );
}
