describe("test suite", () => {

  beforeEach(async () => {

    await browser.url('https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard');
  });


  it("error message on save", async () => {
    await $("div[routerLink='/doctors']").click();
    await browser.execute(() => {
      document.querySelector('div.add-doctor').click();
    });
    await $("input[name='Name']").setValue("John Doe");
    await $('//button[text()= "Save"]').click();

    const emailError = await $('label#Email-info');
    const errorMessageText = await emailError.getText();
    expect(errorMessageText).toEqual("Enter valid email");
  });


  it('toBeDisplayed() method on click add new doc ', async () => {
      await $("div.doctors").click();
      await browser.execute(() => {
        document.querySelector('div.add-doctor').click();
      });
      const elem = await $("div.e-dlg-container");
      await expect(elem).toBeDisplayed()
    }
  )

  it('toExist() method on click add new doc ', async () => {
      await $("div.doctors").click();
      await browser.execute(() => {
        document.querySelector('div.add-doctor').click();
      });
      const elem = await $("div.e-dlg-container");
      await expect(elem).toExist()
    }
  )

  it('toBePresent() method on click add new doc ', async () => {
      await $("div.doctors").click();
      await browser.execute(() => {
        document.querySelector('div.add-doctor').click();
      });
      const elem = await $("div.e-dlg-container");
      await expect(elem).toBePresent()
    }
  )

  it('toBeExisting() method on click add new doc ', async () => {
      await $("div.doctors").click();
      await browser.execute(() => {
        document.querySelector('div.add-doctor').click();
      });
      const elem = await $("div.e-dlg-container");
      await expect(elem).toBeExisting()
    }
  )
  it('toHaveText() method ', async () => {
      const elem = await $("span.card-text.label-text");
      await expect(elem).toHaveText('Total Appointments - Today')
    }
  )
  it('execute() with params', async () =>{
    const doctor = await $('span.card-text.label-text');
    await browser.execute(function (doctor){
      doctor.style.border = 'red solid 2px'
    },doctor);
    await browser.pause(3000)
    }

  )

})






