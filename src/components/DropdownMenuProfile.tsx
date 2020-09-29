import React from 'react';
import { View, TouchableOpacity, AsyncStorage } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { TOKEN_STORAGE, USER_STORAGE } from '../utils/constants';
import { Feather } from '@expo/vector-icons';
import { logOut } from '../utils/for-auth-route';
import AvatarProfile from './AvatarProfile';
import colors from '../utils/colors';

const DropdownMenuProfile = () => {
    let menu: any = null;

    const setMenuRef = (ref: any) => {
      menu = ref;
    };

    const clickLogOut = async () => {
        await AsyncStorage.multiRemove([
            TOKEN_STORAGE,
            USER_STORAGE
        ], (errors) => {
            if (!errors) {
                logOut();
            }
        });
    }

    const hideMenu = () => {
      menu.hide();
    };

    const showMenu = () => {
      menu.show();
    };

    return (
    <View>
        <Menu
            ref={setMenuRef}
            button={
                <TouchableOpacity onPress={showMenu}>
                    <AvatarProfile />
                </TouchableOpacity>
            }
        >
        <MenuItem onPress={hideMenu}>
            Meu perfil {' '} <Feather name="user" size={15} color={colors.purple} />
        </MenuItem>
        <MenuItem onPress={clickLogOut}>
            Sair {' '} <Feather name="log-out" size={15} color={colors.danger} />
        </MenuItem>
        <MenuDivider />
        </Menu>
    </View>
    );
};

export default DropdownMenuProfile;
