import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import colors from '../../utils/colors';

type Props = {
    alertRemoveGrupo: (itemId: string) => void
    itemId: string
}

const DropdownMenuItem = ({ alertRemoveGrupo, itemId }: Props) => {
    let _menu: any = null;

    const setMenuRef = (ref: any) => {
      _menu = ref;
    };

    const hideMenu = () => {
        alertRemoveGrupo(itemId);
      _menu.hide();
    };

    const showMenu = () => {
      _menu.show();
    };

    return (
    <View>
        <Menu
            ref={setMenuRef}
            button={
                <TouchableOpacity onPress={showMenu}>
                    <Feather name="more-vertical" size={20} color={colors.purple} />
                </TouchableOpacity>
            }
        >
        <MenuItem onPress={hideMenu}>
            Editar {' '} <Feather name="edit" size={15} color={colors.success} />
        </MenuItem>
        <MenuItem onPress={hideMenu}>
            Excluir {' '} <Feather name="trash" size={15} color={colors.danger} />
        </MenuItem>
        <MenuDivider />
        </Menu>
    </View>
    );
};

export default DropdownMenuItem;
