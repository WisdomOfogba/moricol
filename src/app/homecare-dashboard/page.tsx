import SelectInput from "@/components/auth/select-input";
import TextInput from "@/components/auth/text-input";
// import TextAreaInput from "@/components/auth/textarea-input";
import Button from "@/components/button";
// import FileInput from "@/components/file-input";
import { landingPageServices } from "@/constants";

// const conditions = [
//   "Stroke",
//   "Cancer",
//   "Parkison's",
//   "Diabetes",
//   "Learning disabilities",
//   "Alzeheimer's",
//   "Blindness",
//   "Mental Illness",
//   "Others",
// ];

export default function Home() {
  return (
    <main>
      <section className="px-20 pb-9 pt-3">
        <div className="border-grey-300 border-b pb-5">
          <p className="text-grey-800 mb-1 inline-block font-medium">
            Which of these best describes your situation?
          </p>
          <div className="flex items-center gap-x-9">
            <div className="flex items-center gap-x-2.5">
              <input
                type="radio"
                value="office"
                id="office"
                name="location"
                className="h-5 w-5"
              />
              <label htmlFor="office">Individual looking for care giver</label>
            </div>
            <div className="flex items-center gap-x-2.5">
              <input
                type="radio"
                value="home"
                id="home"
                name="location"
                className="h-5 w-5"
              />
              <label htmlFor="home">
                Individual looking for specialist care
              </label>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 pb-10 pt-5">
          <SelectInput name="" label="Who Requires this service">
            <option value="">Select</option>
            <option value="">Myself</option>
            <option value="">Spouse</option>
            <option value="">Child</option>
            <option value="">Parent</option>
            <option value="">Grandparent</option>
          </SelectInput>
        </div>
        <div className="pb-6 pt-8">
          <TextInput name="" label="Which Service is required?" />
        </div>
        <div className="mb-6 grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-5 justify-between">
          {landingPageServices.homeCare.services.map(({ bg, service }) => (
            <ServiceCard key={service} bg={bg} service={service} />
          ))}
        </div>
        <Button>Continue</Button>
      </section>

      {/* <section className="pb-9 pt-3">
        <div className="gray-container px-8 py-6">
          <h2 className="mb-7 text-center text-lg font-medium">
            Provide the following information about the care patient
          </h2>

          <form className="grid gap-y-10">
            <div>
              <p className="mb-5">Any Special Condition</p>
              <ul className="mb-3 grid max-w-[612px] grid-cols-3 gap-2">
                {conditions.map((condition, i) => (
                  <li className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      name=""
                      value={condition}
                      id={condition}
                      className="h-5 w-5 border-[#D0D5DD] bg-white"
                    />
                    <label
                      htmlFor={condition}
                      className="text-sm font-medium text-[#4B5563]"
                    >
                      {condition}
                    </label>
                  </li>
                ))}
              </ul>
              <TextInput name="" label="Type other illnesses" />
            </div>

            <div>
              <div className="mb-3">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Do you have difficulty sleeping?
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">Yes</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">No</label>
                  </div>
                </div>
              </div>
              <TextAreaInput
                label="Would you like to add more information"
                name=""
              />
            </div>

            <div>
              <div className="mb-3">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Do you have memory issue?
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">Yes</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">No</label>
                  </div>
                </div>
              </div>
              <TextAreaInput
                label="Would you like to add more information"
                name=""
              />
            </div>

            <div>
              <div className="mb-5">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Are you self caring?
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">Yes</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">No</label>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Do you have trouble lifting?"
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">
                      Individual looking for care giver
                    </label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">
                      Individual looking for specialist care
                    </label>
                  </div>
                </div>
              </div>
              <TextAreaInput
                label="Would you like to add more information"
                name=""
              />
            </div>

            <div>
              <div className="mb-5">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  When is the care required?
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">As soon as possible</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Within the next week</label>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Which type of care is required?
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">Overnight</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Live in</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Visiting</label>
                  </div>
                </div>
              </div>
            </div>
            <Button>Continue</Button>
          </form>
        </div>
      </section> */}

      {/* <section className="pb-9 pt-3">
        <div className="gray-container py-6">
          <h2 className="mb-7 text-center text-lg font-medium">
            Personal Details of Care Recipient
          </h2>

          <form>
            <fieldset className="grid gap-y-8 border-b border-primary-500 px-8 pb-8">
              <TextInput name="" label="First Name" />
              <TextInput name="" label="Last Name" />
              <TextInput name="" label="Phone Number" />
              <TextInput name="" label="Gender" />
              <TextInput name="" label="Date of Birth" />
              <TextInput name="" label="Location of Care Receipient" />
            </fieldset>
            <fieldset className="grid gap-y-8 px-8 py-8">
              <div>
                <label className="mb-5 block">Risk Assessment</label>
                <ul className="mb-3 grid max-w-[612px] grid-cols-3 gap-2">
                  {conditions.map((condition, i) => (
                    <li className="flex items-center gap-x-2" key={i}>
                      <input
                        type="checkbox"
                        name=""
                        value={condition}
                        id={condition}
                        className="h-5 w-5 border-[#D0D5DD] bg-white"
                      />
                      <label
                        htmlFor={condition}
                        className="text-sm font-medium text-[#4B5563]"
                      >
                        {condition}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Which type of care is required?
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">Overnight</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Live in</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Visiting</label>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Which type of care is required?
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">Overnight</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Live in</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Visiting</label>
                  </div>
                </div>
              </div>
              <TextAreaInput
                name=""
                label="List other information you would like us to know"
              />
              <TextAreaInput
                name=""
                label="List other medication you would like us to know"
              />
              <FileInput title="Upload image of care patient" />
            </fieldset>
            <div className="px-8">
              <Button>Continue</Button>
            </div>
          </form>
        </div>
      </section> */}

      {/* <section className="pb-9 pt-3">
        <div className="gray-container py-6">
          <h2 className="mb-7 text-center text-lg font-medium">
            Find a caregiver
          </h2>

          <form>
            <fieldset className="grid gap-y-8 border-b border-primary-500 px-8 pb-8">
              <div className="">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Gender
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">Male</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Female</label>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Religion
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">Islam</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">Christian</label>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-grey-800 mb-1 inline-block font-medium">
                  Age bracket
                </p>
                <div className="flex items-center gap-x-9">
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="office"
                      id="office"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="office">18-25</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">26-35</label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      name="location"
                      className="h-5 w-5"
                    />
                    <label htmlFor="home">36-45</label>
                  </div>
                </div>
              </div>
              <TextInput name="" label="Ethnicity" />
            </fieldset>
            <fieldset className="grid gap-y-8 border-b border-primary-500 px-8 py-8">
              <SelectInput name="" label="Preferred Language of caregiver">
                <option value="">English</option>
              </SelectInput>
              <div>
                <label className="mb-5 block">
                  Preferred Care Giver Arrangement
                </label>
                <ul className="mb-3 grid max-w-[612px] gap-3">
                  {[
                    "I want the caregiver to live with the care recipient",
                    "I want the care giver to come form their home",
                  ].map((condition, i) => (
                    <li className="flex items-center gap-x-2" key={i}>
                      <input
                        type="checkbox"
                        name=""
                        value={condition}
                        id={condition}
                        className="h-5 w-5 border-[#D0D5DD] bg-white"
                      />
                      <label
                        htmlFor={condition}
                        className="text-sm font-medium text-[#4B5563]"
                      >
                        {condition}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </fieldset>
            <fieldset className="grid gap-y-8 px-8 py-8">
              <h3 className="text-lg font-semibold">Extra</h3>
              <p className="text-medium max-w-[586px] text-lg">
                Please note that these services are not covered in the fees
                paid, and you will be charged separately
              </p>

              <div>
                <label className="mb-5 block">
                  Would you like us to come with any of the following?
                </label>
                <ul className="mb-3 grid max-w-[612px] gap-3">
                  {["Adult Diapers", "BP Testing", "Thermometer"].map(
                    (condition, i) => (
                      <li className="flex items-center gap-x-2" key={i}>
                        <input
                          type="checkbox"
                          name=""
                          value={condition}
                          id={condition}
                          className="h-5 w-5 border-[#D0D5DD] bg-white"
                        />
                        <label
                          htmlFor={condition}
                          className="text-sm font-medium text-[#4B5563]"
                        >
                          {condition}
                        </label>
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <p>
                We will require you to provide the following information to be
                able to continue with this service.
              </p>
              <TextInput name="" label="Provide your BVN" />
            </fieldset>
            <div className="px-8">
              <Button>Continue</Button>
            </div>
          </form>
        </div>
      </section> */}

      {/* <section className="px-20 pb-9 pt-3">
        <div className="border-grey-300 border-b pb-5">
          <p className="text-grey-800 mb-1 inline-block font-medium">
            Which of these best describes your situation?"
          </p>

          <div className="flex max-w-[767px] items-center gap-x-9">
            <div className="flex items-center gap-x-2.5">
              <input
                type="radio"
                value="office"
                id="office"
                name="location"
                className="h-5 w-5"
              />
              <label htmlFor="office">One time service charge</label>
            </div>
            <div className="flex items-center gap-x-2.5">
              <input
                type="radio"
                value="home"
                id="home"
                name="location"
                className="h-5 w-5"
              />
              <label htmlFor="home">Monthly service charge</label>
            </div>
          </div>
        </div>
        <div className="grid max-w-[767px] gap-y-5 py-7">
          <SelectInput name="" label="Pick Your Timeline">
            <option value="">Select one</option>
          </SelectInput>

          <TextInput name="" label="Available Date" type="date" />

          <div>
            <p>Available Time</p>
            <div className="grid grid-cols-2 gap-x-10">
              <TextInput name="" type="date" />
              <TextInput name="" type="date" />
            </div>
          </div>

          <div className="">
            <Button>CONTINUE</Button>
          </div>
        </div>
      </section> */}
    </main>
  );
}

function ServiceCard({ bg, service }: { bg: string; service: string }) {
  return (
    <article
      className="relative h-[172.1px] w-full max-w-[181.78px] shrink-0 rounded bg-cover bg-no-repeat object-top"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 overflow-hidden text-center text-sm font-semibold text-white">
        {service}
      </p>
    </article>
  );
}
