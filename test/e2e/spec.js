describe('task-manager e2e test:', function() {
    browser.get('http://10.30.0.44:8080');
    beforeEach(function() {
        browser.driver.sleep(500);
    });

    it('should have a title - just simple test', function() {

        expect(browser.getTitle()).toEqual('task list');
    });
    var allElement;
    it('sesnding newt task to server', function() {

        console.log("test");
        browser.driver.sleep(1000);
        var elementCount;
        element.all(by.repeater('todo in main.taskList')).count().then(function(count) {
            console.log(count);
            elementCount = count;
        });

        element(by.model('main.formData.text')).sendKeys("e2e tests");
        var newLessonDate = element(by.model('main.formData.date'));
        newLessonDate.sendKeys('17-01-2016');
        var select = element(by.model('main.formData.priority'));
        select.$('[value="object:4"]').click();
        // browser.driver.sleep(1000);
        element(by.id('active-btn')).click();
        // browser.driver.sleep(1000);
        console.log(elementCount);
        //browser.driver.sleep(1000);
        element(by.id('btn-submit')).click();
        //browser.driver.sleep(1000);
        element.all(by.repeater('todo in main.taskList')).count().then(function(count) {
            console.log(elementCount + ' ' + count);
            allElement = count - 1;
            expect(elementCount).not.toEqual(count);
        });
    });
    it('sesnding new task to server- example with invalid date', function() {
        console.log("test");
        browser.driver.sleep(1000);
        var elementCount;
        element.all(by.repeater('todo in main.taskList')).count().then(function(count) {
            console.log(count);
            elementCount = count;
        });
        element(by.model('main.formData.text')).sendKeys("e2e tests");
        var newLessonDate = element(by.model('main.formData.date'));
        newLessonDate.sendKeys('asfsafasf');
        var select = element(by.model('main.formData.priority'));
        select.$('[value="object:4"]').click();
        // browser.driver.sleep(1000);
        element(by.id('active-btn')).click();
        // browser.driver.sleep(1000);
        console.log(elementCount);
        //browser.driver.sleep(1000);
        element(by.id('btn-submit')).click();
        //browser.driver.sleep(1000);
        element.all(by.repeater('todo in main.taskList')).count().then(function(count) {
            console.log(elementCount + ' ' + count);
            expect(elementCount).not.toEqual(count);
            var elementCount = "deleting_" + (count - 1);
            element(by.id(elementCount)).click();
        });
    });

    it('checking edit element', function() {
        var elementCount = "options_" + allElement;
        console.log(elementCount);
        element(by.id(elementCount)).click();
        browser.driver.sleep(2000);
        currentTask = element(by.model('main.currentElement.text'));
        element(by.model('main.currentElement.text')).getAttribute('value').then(function(text) {
            expect(text).not.toEqual('');
        });
    });

    it('edit element -clear', function() {
        element(by.model('main.currentElement.text')).sendKeys("e2e edit tests");
        var newLessonDate = element(by.model('main.currentElement.date'));
        newLessonDate.sendKeys('18-01-2016');
        var select = element(by.model('main.currentElement.priority'));
        select.$('[value="object:5"]').click();
        element(by.model('main.currentElement.description')).sendKeys("some text");
        element(by.id("clear-edit")).click();
        element(by.model('main.currentElement.text')).getAttribute('value').then(function(text) {
            expect(text).toEqual('');
        });
        element(by.model('main.currentElement.date')).getAttribute('value').then(function(text) {
            expect(text).toEqual('');
        });
        element(by.model('main.currentElement.description')).getAttribute('value').then(function(text) {
            expect(text).toEqual('');
        });
    });

    it('edit element ', function() {
        element(by.model('main.currentElement.text')).sendKeys("e2e edit tests");
        var newLessonDate = element(by.model('main.currentElement.date'));
        newLessonDate.sendKeys('18-01-2016');
        var select = element(by.model('main.currentElement.priority'));
        select.$('[value="object:5"]').click();
        element(by.model('main.currentElement.description')).sendKeys("some text");
        element(by.id("save-edit")).click();
        var elementCount = "options_" + (allElement-1);
        console.log(elementCount);
        var elementCount = "options_" + allElement;
        console.log(elementCount);
        element(by.model('main.currentElement.text')).getAttribute('value').then(function(text) {
            expect(text).toEqual('e2e edit tests');
        });
    
    });

    //deleting added element disable in testing case
    // it('deleting last added element', function() {
    //     var elementCount = "deleting_" + (allElement - 1);
    //     element(by.id("deleting_6")).click();
    //     browser.driver.sleep(2000);
    //     element.all(by.repeater('todo in main.taskList')).count().then(function(count) {
    //         console.log(allElement + ' ' + count);
    //         expect(count).toEqual(allElement);
    //     });
    // });

});
