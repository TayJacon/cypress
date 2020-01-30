/// <reference types="cypress" />

it('A external test...', () => {
    //add the code here
})

describe('Group test...', () => {

    it('First test...', () => {
        //add first test code
    })

    it('First second...', () => {
        //add second test code
    })
})

describe('Group test...', () => {

    describe('Specific group test...', () => {

        it('First test...', () => {
            //add first test code
        })
    
        it('First second...', () => {
            //add second test code
        })

    })

    
    describe('Group test...', () => {

        it('First test...', () => {
            //add first test code
        })
    
        it('First second...', () => {
            //add second test code
        })

    })
})

//the test not run but appears like skipped
describe.skip('Group test...', () => {

    describe('Specific group test...', () => {

        it('First test...', () => {
            //add first test code
        })
    
        it('First second...', () => {
            //add second test code
        })

    })

    
    describe('Group test...', () => {

        it('First test...', () => {
            //add first test code
        })
    
        it('First second...', () => {
            //add second test code
        })

    })
})

//run only this test, always execute the last one founded
it.only('A external test...', () => {
    //add the code here
})