export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of your web
          application running on Netlify. The landing page should include the following: Your full
          name and section liks to each of the lab assignment. Link to the kanbas application. Links to all revelant source code repositories. 
          The Kanbas application should include a link to naviagte back to the landing page.
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} /> 
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignement Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="assignment">Assignment</option>
              </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="percentage">Percentage</option>
              </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="peronlinecentage">Online</option> 
              </select> 
              <td>
                <br />
                <label>Online Entry Options</label><br />
                <input type="checkbox" name="check-entry" id="wd-text-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label><br />

                <input type="checkbox" name="check-entry" id="wd-website-url" />
                <label htmlFor="wd-website-url">Website URL</label><br />

                <input type="checkbox" name="check-entry" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                <input type="checkbox" name="check-entry" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                <input type="checkbox" name="check-entry" id="wd-file-upload" />
                <label htmlFor="wd-file-upload">File Uploads</label><br />
              </td>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label> <br />
              <input id="wd-points" value={"Everyone"} /> 
              <br />
              <br />
              <label htmlFor="wd-due-date">Due</label> <br />
              <input type="date" value="2024-05-13" id="wd-text-fields-due"/>
              <br />
              <br />
              <table>
                <tr>
                  <td>
                    <label htmlFor="wd-available-from">Avaliable from</label> <br />
                    <input type="date" value="2024-05-06" id="wd-text-fields-from"/>
                  </td>
                  <td>
                    <label htmlFor="wd-available-until">Until</label> <br />
                    <input type="date" value="2024-05-20" id="wd-text-fields-until"/>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <br />
        <div style={{ textAlign: 'right' }}>
          <button type="button" onClick={() => alert('Cancel clicked')}>Cancel</button> <button type="button" onClick={() => alert('Save clicked')}>Save</button>
        </div>
    </div>
);}
