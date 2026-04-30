import React from 'react'

function OutputPanel({ output }) {
  return (
    <div className='h-full bg-base-100 flex flex-col'>
      <div className='px-4 py-2 bg-base-200 border-base-300 font-semibold text-sm'>
        Output
      </div>
      <div className='flex-1 p-4 overflow-auto'>
        {output === null ? (
          <p className='text-base-content/50 text-sm'>
            Click "Run Code" to see the output here.
          </p>
        ) : output.success ? (
          <pre className='whitespace-pre-wrap text-sm font-mono text-success'>
            {output.output}
          </pre>
        ) : (
          <div>
            {output.output && (
              <pre className='whitespace-pre-wrap text-sm font-mono text-base-content mb-2'>
                {output.output}
              </pre>
            )}
            <pre className='whitespace-pre-wrap text-sm font-mono text-error'>
              {output.error}
            </pre>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default OutputPanel
