import { MaskService } from 'react-native-masked-text';

export const mascaraDinheiro = (valor: string) => MaskService.toMask('money', parseFloat(valor).toFixed(2), {
    unit: 'R$',
    separator: ',',
    delimiter: '.',
});
