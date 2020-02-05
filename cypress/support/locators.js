const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTING: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        HOME: '[data-test=menu-home]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP_BTN_ALTERAR: "//table//td[conatins(., 'Conta de teste')]/.//i[@class='far fa-edit']"
    },
    MESSAGE: '.toast-message',
    MOVIMENTACAO: {
        DESCRIÇÃO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        BTN_SALVAR: '.btn-primary',
        STATUS: '[data-test=status]'
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contais(., '${nome}')]/../tf[2]`
    }
}

export default locators;