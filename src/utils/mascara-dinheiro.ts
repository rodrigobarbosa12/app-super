import { MaskService } from 'react-native-masked-text';

export const mascaraDinheiro = (valor: string | number) => MaskService.toMask('money', parseFloat(String(valor)).toFixed(2), {
    unit: 'R$',
    separator: ',',
    delimiter: '.',
});
