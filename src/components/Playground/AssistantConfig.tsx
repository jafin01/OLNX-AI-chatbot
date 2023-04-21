import { Form, Formik } from 'formik';
import React, { useEffect } from 'react'

type ConfigType =  {
  isOpen?: boolean,
  index?: number,
  name: string,
  id?: string | number,
  model: string,
  system: string,
  temperature: number,
  maxLength: number,
  top_p: number,
  frequency_penalty: number,
  presence_penalty: number,
}

function AssistantConfig({ 
    configModel, 
    setConfigModel, 
    formikRef, 
    saveConfig, 
    intValues
  } : { 
    configModel: ConfigType, 
    setConfigModel: any, 
    formikRef: any, 
    saveConfig: () => void, 
    intValues: ConfigType 
  },) {
    
    // function start here 
  // useEffect(() => {
  //   console.log('configModel', configModel)
  //   console.log('intValues', intValues)
  // }, [configModel, intValues])

  function onSave(values:any) {
    if(values)
    setConfigModel({
      ...configModel,
      ...values,
      system: configModel.system,
    })

   saveConfig();
  }

  return (
    <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
          onClick={() => setConfigModel({ isOpen: false })}
        >
          <div
            className="w-96 h-auto bg-white rounded-md shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
              <h1 className="text-lg font-semibold font-mono">{configModel.name}</h1>
              <button
                className="text-gray-500 hover:text-gray-600"
                onClick={() => setConfigModel({ isOpen: false })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <Formik
                initialValues={intValues}
                //   validationSchema={validationSchema}
                innerRef={formikRef}
                onSubmit={onSave}
                // handleChange={onChange}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <div>
                      <div className="p-4 h-full border border-gray-300 rounded-sm flex flex-col">
                        <div>
                          <div className="border pt-1 my-2 border-gray-300 rounded-sm flex flex-col">
                            <select
                              name="model"
                              value={values.model}
                              onChange={async (e) => {
                                await handleChange(e);
                                // saveConversation();
                              }}
                              className="w-full p-2 mb-2"
                            >
                              <option value="gpt-4">GPT-4</option>
                              <option value="gpt-3.5-turbo">
                                GPT-3.5 Turbo
                              </option>
                            </select>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p>Temperature</p>
                              <p>{values.temperature}</p>
                            </div>
                            <input
                              name="temperature"
                              value={values.temperature}
                              onChange={async (e) => {
                                await handleChange(e);
                                // saveConversation();
                              }}
                              className="w-full accent-teal-700"
                              type="range"
                              step="0.01"
                              min="0"
                              max="1"
                              // bind:value={config1.temperature}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p>Maximum Length</p>
                              <p>{values.maxLength}</p>
                            </div>
                            <input
                              name="maxLength"
                              value={values.maxLength}
                              onChange={async (e) => {
                                await handleChange(e);
                                // saveConversation();
                              }}
                              className="w-full accent-teal-700"
                              type="range"
                              step="1"
                              min="1"
                              max="2048"
                              // bind:value={config1.max_length}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p>Top P</p>
                              <p>{values.top_p}</p>
                            </div>
                            <input
                              name="top_p"
                              value={values.top_p}
                              onChange={async (e) => {
                                await handleChange(e);
                                // saveConversation();
                              }}
                              className="w-full accent-teal-700"
                              type="range"
                              step="0.01"
                              min="0"
                              max="1"
                              // bind:value={config1.top_p}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p>Frequency Penalty</p>
                              <p>{values.frequency_penalty}</p>
                            </div>
                            <input
                              name="frequency_penalty"
                              value={values.frequency_penalty}
                              onChange={async (e) => {
                                await handleChange(e);
                                // saveConversation();
                              }}
                              className="w-full accent-teal-700"
                              type="range"
                              step="0.01"
                              min="0"
                              max="2"
                              // bind:value={config1.frequency_penalty}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p>Presence Penalty</p>
                              <p>{values.presence_penalty}</p>
                            </div>
                            <input
                              name="presence_penalty"
                              value={values.presence_penalty}
                              onChange={async (e) => {
                                await handleChange(e);
                                // saveConversation();
                              }}
                              className="w-full accent-teal-700"
                              type="range"
                              step="0.01"
                              min="0"
                              max="2"
                              // bind:value={config1.presence_penalty}
                            />
                          </div>
                        <button type="submit" className="bg-teal-700 mt-5 h-12 rounded text-white">Save</button>
                        </div>
                      </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
  )
}

export default AssistantConfig
